import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { VerifyToken } from './token';
// import { async } from 'rxjs';

export const User = createParamDecorator(
  async (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const Authorization = request?.headers?.authorization
    console.log(Authorization)
    const user = await VerifyToken(Authorization.split(' ')[1])
    console.log(user)
    return user.userID
  },
);