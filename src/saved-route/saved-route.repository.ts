/**
 * Repositoty
 * - 저장 루트 데이터가 어디에 있는가
 * - 저장된 데이터를 어떤 방법으로 가져오는가
 */

import { Injectable } from '@nestjs/common';

import type { Prisma, SavedRoute as PrismaSavedRoute } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedRouteRepository {
  // 실제 데이터를 PostgreSQL이 보관
  constructor(private readonly prisma: PrismaService) {}

  // Promise. DB 조회는 시간이 걸리는 비동기 작업
  findAll(): Promise<PrismaSavedRoute[]> {
    return this.prisma.savedRoute.findMany({
      orderBy: {
        savedAt: 'desc',
      },
    });
  }

  findAllByUserId(
    userId: number,
    skip: number,
    take: number,
    orderBy: Prisma.SavedRouteOrderByWithRelationInput,
    keyword?: string,
    minSavingAmount?: number,
  ) {
    const where = this.buildWhere(userId, keyword, minSavingAmount);

    return this.prisma.savedRoute.findMany({
      where,
      skip,
      take,
      orderBy,
    });
  }

  findById(id: number): Promise<PrismaSavedRoute | null> {
    return this.prisma.savedRoute.findUnique({
      where: { id },
    });
  }

  findByIdAndUserId(id: number, userId: number) {
    return this.prisma.savedRoute.findFirst({
      where: {
        id,
        userId,
      },
    });
  }

  // 저장 루트가 총 몇 개? 페이지네이션용
  countByUserId(
    userId: number,
    keyword?: string,
    minSavingAmount?: number,
  ): Promise<number> {
    const where = this.buildWhere(userId, keyword, minSavingAmount);

    return this.prisma.savedRoute.count({
      where,
    });
  }
  // 전체 절약 금액 합계 totalSavingAmount용
  async sumSavingAmountByUserId(userId: number): Promise<number> {
    const result = await this.prisma.savedRoute.aggregate({
      where: {
        userId,
      },
      _sum: {
        savingAmount: true,
      },
    });

    return result._sum.savingAmount ?? 0;
  }

  private buildWhere(
    userId: number,
    keyword?: string,
    minSavingAmount?: number,
  ): Prisma.SavedRouteWhereInput {
    return {
      userId,

      ...(keyword && {
        title: {
          contains: keyword,
          mode: 'insensitive',
        },
      }),

      ...(minSavingAmount !== undefined && {
        savingAmount: {
          gte: minSavingAmount,
        },
      }),
    };
  }

  create(
    title: string,
    savingAmount: number,
    userId: number,
  ): Promise<PrismaSavedRoute> {
    return this.prisma.savedRoute.create({
      data: {
        title,
        savingAmount,
        userId,
      },
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.prisma.savedRoute.delete({
      where: { id },
    });
  }
}
