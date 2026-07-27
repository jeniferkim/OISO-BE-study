/**
 * Repositoty
 * - 저장 루트 데이터가 어디에 있는가
 * - 저장된 데이터를 어떤 방법으로 가져오는가
 */

import { Injectable } from '@nestjs/common';

import type { SavedRoute } from './saved-route.type';

// NestJS가 이 클래스를 생성하고 다른 클래스에 주입할 수 있게 표시하는 데코레이터
@Injectable()
export class SavedRouteRepository {
  private readonly savedRoutes: SavedRoute[] = [
    // 임시 DB 역할
    {
      id: 1,
      title: '부산 원도심 루트',
      savingAmount: 5000,
      savedAt: '2026-07-25T08:00:00.000Z',
    },
    {
      id: 2,
      title: '영도 바다 루트',
      savingAmount: 3000,
      savedAt: '2026-07-26T09:00:00.000Z',
    },
  ];

  findAll(): SavedRoute[] {
    return this.savedRoutes; // 저장된 데이터 가져옴
    // Prisma 붙으면 아래처럼
    // return this.prisma.savedRoute.findMany();
  }

  // ID 조회 메서드 추가
  // 찾으면 SavedRoute 반환. 없으면 undefined 반환
  findById(id: number): SavedRoute | undefined {
    return this.savedRoutes.find((savedRoute) => savedRoute.id === id);
  }
}
