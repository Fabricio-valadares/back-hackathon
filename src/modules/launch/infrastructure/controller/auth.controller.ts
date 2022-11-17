import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from '../services/auth.service';

@Controller()
export class AuthController {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}
  @Post('/login')
  async login(
    @Res() response: Response,
    @Body() body: { username: string; password: string },
  ): Promise<Response> {
    const res = await this.authService.login(body.username, body.password);

    return response.status(HttpStatus.OK).json(res);
  }

  @Post('/create-user')
  async createUser(
    @Res() response: Response,
    @Body() body: { username: string; password: string; email: string },
  ): Promise<Response> {
    const res = await this.authService.createUser(
      body.username,
      body.password,
      body.email,
    );

    return response.status(HttpStatus.OK).json(res);
  }
}
