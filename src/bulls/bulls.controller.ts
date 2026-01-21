import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BullsService } from './bulls.service';
import { GetBullsDto } from './dto/getBullsDto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@UseGuards(AuthGuard('jwt'))
@Controller('bulls')
export class BullsController {
  constructor(private readonly bullsService: BullsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar toros con filtros y paginación' })
  @ApiResponse({ status: 200, description: 'Listado de toros' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiBearerAuth()
  findAll(@Query() getBullsDto: GetBullsDto, @Req() req) {
    return this.bullsService.findAll(getBullsDto, req.user.userId);
  }

  @Post(':id/favorite')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Agregar un toro a tu lista de favoritos' })
  @ApiResponse({ status: 200, description: 'Toro agregado a favoritos' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  favorite(@Param('id') id: string, @Req() req) {
    return this.bullsService.markAsFavorite(id, req.user.userId);
  }

  @Delete(':id/favorite')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un toro de tu lista de favoritos' })
  @ApiResponse({ status: 200, description: 'Toro eliminado de favoritos' })
  @ApiResponse({ status: 400, description: 'Parámetros inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  unfavorite(@Param('id') id: string, @Req() req) {
    return this.bullsService.deleteFavorite(id, req.user.userId);
  }
}
