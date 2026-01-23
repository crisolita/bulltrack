import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AuthDto } from './dto/auth.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(authDto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: authDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(authDto.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Wrong password');
    }

    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async register(authDto: AuthDto) {
    const hashedPassword = await bcrypt.hash(authDto.password ?? '', 10);
    const email = authDto.email;
    if (email) {
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) {
        return await this.prisma.user.create({
          data: { email, password: hashedPassword },
        });
      } else {
        return new BadRequestException('Email ya esta registrado');
      }
    }
  }
}
