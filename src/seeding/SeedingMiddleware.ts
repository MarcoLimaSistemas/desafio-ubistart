import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ROLE } from 'src/user/dto/role-enum';
import { User } from 'src/user/entities/user.entity';
import { EntityManager } from 'typeorm';
import { SeedingLogEntry } from './entities/Seeding.entity';

@Injectable()
export class SeedingMiddleware implements NestMiddleware {
  // to avoid roundtrips to db we store the info about whether
  // the seeding has been completed as boolean flag in the middleware
  // we use a promise to avoid concurrency cases. Concurrency cases may
  // occur if other requests also trigger a seeding while it has already
  // been started by the first request. The promise can be used by other
  // requests to wait for the seeding to finish.
  private isSeedingComplete: Promise<boolean>;

  constructor(private readonly entityManager: EntityManager) {}

  async use(req: Request, res: Response, next: any) {
    if (await this.isSeedingComplete) {
      // seeding has already taken place,
      // we can short-circuit to the next middleware
      return next();
    }

    this.isSeedingComplete = (async () => {
      // for example you start with an initial seeding entry called 'initial-seeding'
      // on 2019-06-27. if 'initial-seeding' already exists in db, then this
      // part is skipped
      if (
        !(await this.entityManager.findOne(SeedingLogEntry, {
          id: 'initial-seeding',
        }))
      ) {
        await this.entityManager.transaction(
          async (transactionalEntityManager) => {
            //A aplicação deve fornecer um usuario administrador por padrão
            // Acabei criando uma estratégia de seed baseado em um post porem não gostei muito
            // Visto que é um middleware e a aplicação fará uma chamada toda vez sem necessidade
            const user = new User();
            user.id = '234qdswda34';
            user.email = 'admin@teste.com';
            user.name = 'admin';
            user.password = '123123';
            user.role = ROLE.ADMIN;
            await transactionalEntityManager.save(user);
            // persist in db that 'initial-seeding' is complete
            await transactionalEntityManager.save(
              new SeedingLogEntry('initial-seeding'),
            );
          },
        );
      }

      return true;
    })();

    await this.isSeedingComplete;

    next();
  }
}
