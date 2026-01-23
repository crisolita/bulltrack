import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

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
  async login(@Body() authDto: AuthDto) {
    return this.authService.login(authDto);
  }
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiResponse({
    status: 200,
    description: 'Registro exitoso',
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
  async register(@Body() authDto: AuthDto) {
    return this.authService.register(authDto);
  }
}
