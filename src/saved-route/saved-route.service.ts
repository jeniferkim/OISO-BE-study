import { Injectable } from '@nestjs/common';

import { SavedRouteRepository } from './saved-route.repository';
import type { SavedRouteListResponse } from './saved-route.type';

@Injectable()
export class SavedRouteService {
  constructor(private readonly savedRouteRepository: SavedRouteRepository) {}

  findAll(): SavedRouteListResponse {
    // 레포에 데이터를 요청함
    const savedRoutes = this.savedRouteRepository.findAll();

    // 총 절약 금액 계산
    const totalSavingAmount = savedRoutes.reduce(
      (total, route) => total + route.savingAmount,
      0,
    );

    // 프론트가 받을 응답 형태를 만듦
    return {
      savedRoutes,
      totalSavingAmount,
    };
  }
}
