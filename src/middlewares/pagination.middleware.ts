import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

interface RequestProps extends Omit<Request, 'query'> {
  query: {
    page: number;
    perPage: number;
  };
}

@Injectable()
export class PaginationMiddleware implements NestMiddleware {
  use(req: RequestProps, res: Response, next: () => void) {
    req.query.page = Number(req.query.page ?? 1);
    req.query.perPage = Number(req.query.perPage ?? 8);
    next();
  }
}
