/**
 * Repositoty
 * - 저장 루트 데이터가 어디에 있는가
 * - 저장된 데이터를 어떤 방법으로 가져오는가
 */

import { Injectable } from '@nestjs/common';
import type { SavedRoute as PrismaSavedRoute } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

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

  findAllByUserId(userId: number) {
    return this.prisma.savedRoute.findMany({
      where: {
        userId,
      },
      orderBy: {
        savedAt: 'desc',
      },
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
