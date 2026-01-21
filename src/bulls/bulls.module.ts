import { Module } from '@nestjs/common';
import { BullsController } from './bulls.controller';
import { BullsService } from './bulls.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BullsController],
  providers: [BullsService, PrismaService],
})
export class BullsModule {}
