import { Controller, Get, Request } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
interface AuthenticatedRequest extends ExpressRequest {
  user: { name: string; email: string };
}
@Controller('user')
export class UserController {
  @Get('')
  getUser(@Request() req: AuthenticatedRequest) {
    return { message: 'Protected route', user: req.user };
  }
}
