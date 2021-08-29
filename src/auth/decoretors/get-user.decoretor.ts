import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

type RequestType = {
  user: User;
};

export const GetUser = createParamDecorator(
  (_, req: ExecutionContext): User => {
    const request = req.switchToHttp().getRequest<RequestType>();

    return request.user;
  },
);
