import { Injectable, NotFoundException } from '@nestjs/common';

import { SavedRouteRepository } from './saved-route.repository';
import type { SavedRoute, SavedRouteListResponse } from './saved-route.type';

import { CreateSavedRouteDto } from './dto/create-saved-route.dto';

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

  // 상세 조회 기능 추가
  // 레포에서 ID로 조회 -> 없으면 404, 있으면 데이터 반환
  findOne(id: number): SavedRoute {
    const savedRoute = this.savedRouteRepository.findById(id);

    if (!savedRoute) {
      throw new NotFoundException('저장 루트를 찾을 수 없습니다.'); // 404
    }

    return savedRoute; // 데이터 반환
  }

  // 생성 기능 수행
  // 현재는 단순 전달
  create(createSavedRouteDto: CreateSavedRouteDto): SavedRoute {
    return this.savedRouteRepository.create(
      createSavedRouteDto.title,
      createSavedRouteDto.savingAmount,
    );
  }
}
