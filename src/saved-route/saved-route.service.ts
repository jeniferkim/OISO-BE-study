import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateSavedRouteDto } from './dto/create-saved-route.dto';
import { SavedRouteRepository } from './saved-route.repository';
import type {
  DeleteSavedRouteResponse,
  SavedRoute,
  SavedRouteListResponse,
} from './saved-route.type';

@Injectable()
export class SavedRouteService {
  constructor(private readonly savedRouteRepository: SavedRouteRepository) {}

  async findAll(): Promise<SavedRouteListResponse> {
    const savedRouteRecords = await this.savedRouteRepository.findAll();

    const savedRoutes = savedRouteRecords.map((record) =>
      this.toResponse(record),
    );

    const totalSavingAmount = savedRoutes.reduce(
      (total, route) => total + route.savingAmount,
      0,
    );

    return {
      savedRoutes,
      totalSavingAmount,
    };
  }

  async findAllByUserId(userId: number): Promise<SavedRouteListResponse> {
    const savedRouteRecords =
      await this.savedRouteRepository.findAllByUserId(userId);

    const savedRoutes = savedRouteRecords.map((record) =>
      this.toResponse(record),
    );

    const totalSavingAmount = savedRoutes.reduce(
      (total, route) => total + route.savingAmount,
      0,
    );

    return {
      savedRoutes,
      totalSavingAmount,
    };
  }

  async findOne(userId: number, savedRouteId: number): Promise<SavedRoute> {
    const savedRoute = await this.savedRouteRepository.findByIdAndUserId(
      savedRouteId,
      userId,
    );

    if (!savedRoute) {
      throw new NotFoundException('저장 루트를 찾을 수 없습니다.');
    }

    return this.toResponse(savedRoute);
  }

  async create(
    userId: number,
    createSavedRouteDto: CreateSavedRouteDto,
  ): Promise<SavedRoute> {
    const savedRoute = await this.savedRouteRepository.create(
      createSavedRouteDto.title,
      createSavedRouteDto.savingAmount,
      userId,
    );

    return this.toResponse(savedRoute);
  }

  async remove(
    userId: number,
    savedRouteId: number,
  ): Promise<DeleteSavedRouteResponse> {
    const savedRoute = await this.savedRouteRepository.findById(savedRouteId);

    if (!savedRoute) {
      throw new NotFoundException('저장 루트를 찾을 수 없습니다.');
    }

    if (savedRoute.userId !== userId) {
      throw new ForbiddenException('해당 저장 루트를 삭제할 권한이 없습니다.');
    }

    await this.savedRouteRepository.deleteById(savedRouteId);

    return {
      message: '저장 루트가 삭제되었습니다.',
    };
  }

  private toResponse(savedRoute: {
    id: number;
    title: string;
    savingAmount: number;
    savedAt: Date;
  }): SavedRoute {
    return {
      id: savedRoute.id,
      title: savedRoute.title,
      savingAmount: savedRoute.savingAmount,
      savedAt: savedRoute.savedAt.toISOString(),
    };
  }
}
