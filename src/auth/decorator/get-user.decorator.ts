import { from } from 'rxjs';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    if(data) {
      return data ? request.user?.[data] : request.user;
    }
    console.log(request.user);
    return request.user
    
  },
);


// this allows us to get the user from the request object and use it in our controllers.
