import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

import express from 'express';

function setAuthCookies(res: express.Response, access: string) {
  const domain =
    process.env.NODE_ENV === 'production'
      ? process.env.COOKIE_DOMAIN || undefined
      : undefined;
  const secure = String(process.env.COOKIE_SECURE) === 'true';
  res.cookie('accessToken', access, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    domain,
    path: '/',
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week (matches JWT expiration)
  });
}
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    schema: {
      example: {
        access_token: 'jwt.token.here',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Credenciales inválidas',
  })
  async login(@Body() authDto: AuthDto, @Res() res: express.Response) {
    const { access_token } = await this.authService.login(authDto);
    setAuthCookies(res, access_token);
    return res.json({ message: 'Login exitoso' });
  }
}
