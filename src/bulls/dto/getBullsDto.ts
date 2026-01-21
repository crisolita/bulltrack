import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsIn, IsOptional, IsString } from 'class-validator';

import { PaginationDto } from 'src/common/pagination.dto';
import { Origen, Pelaje, Uso } from 'generated/prisma/enums';

export class GetBullsDto extends PaginationDto {
  @ApiPropertyOptional({
    description: 'Buscar por caravana o nombre',
    example: 'Indomable',
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    enum: Origen,
    example: Origen.propio,
  })
  @IsOptional()
  @IsEnum(Origen, {
    message: `origen must be one of: ${Object.values(Origen).join(', ')}`,
  })
  origen?: Origen;

  @ApiPropertyOptional({
    enum: Pelaje,
    example: Pelaje.negro,
  })
  @IsOptional()
  @IsEnum(Pelaje, {
    message: `pelaje must be one of: ${Object.values(Pelaje).join(', ')}`,
  })
  pelaje?: Pelaje;

  @ApiPropertyOptional({
    description: 'Solo favoritos del usuario autenticado',
    example: true,
  })
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  favoritos?: boolean;

  @ApiPropertyOptional({
    enum: Uso,
    example: Uso.vaquillona,
  })
  @IsOptional()
  @IsEnum(Uso, {
    message: `uso must be one of: ${Object.values(Uso).join(', ')}`,
  })
  uso?: Uso;

  @ApiPropertyOptional({
    description: 'Ordenar por score',
    enum: ['high', 'low'],
    example: 'high',
  })
  @IsOptional()
  @IsIn(['high', 'low'])
  sort?: 'high' | 'low';
}
