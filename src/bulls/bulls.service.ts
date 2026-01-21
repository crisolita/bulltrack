import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetBullsDto } from './dto/getBullsDto';
import { Bull, Prisma } from 'generated/prisma/browser';

@Injectable()
export class BullsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(dto: GetBullsDto, userId: string) {
    const {
      page = 1,
      limit = 10,
      search,
      origen,
      pelaje,
      uso,
      favoritos,
      sort,
    } = dto;

    const skip = (page - 1) * limit;

    const where: Prisma.BullWhereInput = {};
    if (search) {
      where.OR = [
        { caravana: { contains: search, mode: 'insensitive' } },
        { nombre: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (origen) {
      where.origen = origen;
    }

    if (pelaje) {
      where.pelaje = pelaje;
    }

    if (uso) {
      where.uso = uso;
    }

    if (favoritos) {
      where.favorites = {
        some: {
          userId,
        },
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.bull.findMany({
        where,
        skip,
        take: Number(limit),
        include: {
          favorites: {
            where: { userId },
          },
        },
      }),
      this.prisma.bull.count({ where }),
    ]);

    const sortedBulls =
      sort === 'high' || sort === 'low'
        ? this.sortBullsByScore(data, sort === 'low' ? 'asc' : 'desc')
        : data;

    return {
      data: sortedBulls.map((bull) => ({
        ...bull,
        score: this.getScore(bull),
      })),
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  ///Given a bull, calculate its score based on attributes (weigthed sum)
  getScore(bull: Bull): number {
    return (
      bull.crecimiento * 0.3 +
      bull.facilidadParto * 0.25 +
      bull.reproduccion * 0.2 +
      bull.moderacion * 0.15 +
      bull.carcasa * 0.1
    );
  }

  sortBullsByScore(bulls: Bull[], direction: 'asc' | 'desc' = 'desc') {
    return bulls.sort((a, b) => {
      const scoreA = this.getScore(a);
      const scoreB = this.getScore(b);

      return direction === 'asc' ? scoreA - scoreB : scoreB - scoreA;
    });
  }

  async markAsFavorite(bullId: string, userId: string) {
    const bullExists = await this.prisma.bull.findUnique({
      where: { id: bullId },
      select: { id: true },
    });

    if (!bullExists) {
      throw new NotFoundException('Bull not found');
    }
    const favoriteExists = await this.prisma.favorite.findFirst({
      where: {
        AND: {
          bullId,
          userId,
        },
      },
    });

    if (favoriteExists) {
      return favoriteExists;
    }
    return this.prisma.favorite.create({
      data: {
        bullId,
        userId,
      },
    });
  }

  async deleteFavorite(bullId: string, userId: string) {
    const bullExists = await this.prisma.bull.findUnique({
      where: { id: bullId },
      select: { id: true },
    });

    if (!bullExists) {
      throw new NotFoundException('Bull not found');
    }
    const favoriteExists = await this.prisma.favorite.findFirst({
      where: {
        AND: {
          bullId,
          userId,
        },
      },
    });

    if (!favoriteExists) {
      return new NotFoundException('Favorite not found');
    }
    return this.prisma.favorite.deleteMany({
      where: {
        bullId,
        userId,
      },
    });
  }
}
