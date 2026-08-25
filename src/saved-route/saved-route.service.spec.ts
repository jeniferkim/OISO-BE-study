import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

import { SavedRouteRepository } from './saved-route.repository';
import { SavedRouteService } from './saved-route.service';

describe('SavedRouteService', () => {
  let service: SavedRouteService;

  const mockSavedRouteRepository = {
    findAllByUserId: jest.fn(),
    findByIdAndUserId: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    deleteById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SavedRouteService,
        {
          provide: SavedRouteRepository,
          useValue: mockSavedRouteRepository,
        },
      ],
    }).compile();

    service = module.get<SavedRouteService>(SavedRouteService);

    jest.clearAllMocks();
  });

  describe('findAllByUserId', () => {
    it('사용자의 저장 루트 목록과 총 절약 금액을 반환한다', async () => {
      // Arrange
      mockSavedRouteRepository.findAllByUserId.mockResolvedValue([
        {
          id: 1,
          title: '부산 원도심 루트',
          savingAmount: 5000,
          savedAt: new Date('2026-08-24T10:00:00.000Z'),
          userId: 1,
        },
        {
          id: 2,
          title: '영도 루트',
          savingAmount: 3000,
          savedAt: new Date('2026-08-24T11:00:00.000Z'),
          userId: 1,
        },
      ]);

      // Act
      const result = await service.findAllByUserId(1);

      // Assert
      expect(mockSavedRouteRepository.findAllByUserId).toHaveBeenCalledWith(1);

      expect(result.savedRoutes).toHaveLength(2);

      expect(result.totalSavingAmount).toBe(8000);

      expect(result.savedRoutes[0]).toEqual({
        id: 1,
        title: '부산 원도심 루트',
        savingAmount: 5000,
        savedAt: '2026-08-24T10:00:00.000Z',
      });
    });

    it('저장 루트가 없으면 빈 배열과 0원을 반환한다', async () => {
      // Arrange
      mockSavedRouteRepository.findAllByUserId.mockResolvedValue([]);

      // Act
      const result = await service.findAllByUserId(1);

      // Assert
      expect(result.savedRoutes).toEqual([]);
      expect(result.totalSavingAmount).toBe(0);
    });
  });

  describe('create', () => {
    it('인증된 사용자 ID로 저장 루트를 생성한다', async () => {
      // Arrange
      const dto = {
        title: '부산 원도심 루트',
        savingAmount: 5000,
      };

      mockSavedRouteRepository.create.mockResolvedValue({
        id: 1,
        title: dto.title,
        savingAmount: dto.savingAmount,
        savedAt: new Date('2026-08-24T10:00:00.000Z'),
        userId: 1,
      });

      // Act
      const result = await service.create(1, dto);

      // Assert
      expect(mockSavedRouteRepository.create).toHaveBeenCalledWith(
        '부산 원도심 루트',
        5000,
        1,
      );

      expect(result).toEqual({
        id: 1,
        title: '부산 원도심 루트',
        savingAmount: 5000,
        savedAt: '2026-08-24T10:00:00.000Z',
      });
    });
  });

  describe('findOne', () => {
    it('본인의 저장 루트를 상세 조회한다', async () => {
      // Arrange
      mockSavedRouteRepository.findByIdAndUserId.mockResolvedValue({
        id: 1,
        title: '부산 원도심 루트',
        savingAmount: 5000,
        savedAt: new Date('2026-08-24T10:00:00.000Z'),
        userId: 1,
      });

      // Act
      const result = await service.findOne(1, 1);

      // Assert
      expect(mockSavedRouteRepository.findByIdAndUserId).toHaveBeenCalledWith(
        1,
        1,
      );

      expect(result).toEqual({
        id: 1,
        title: '부산 원도심 루트',
        savingAmount: 5000,
        savedAt: '2026-08-24T10:00:00.000Z',
      });
    });

    it('조회 가능한 저장 루트가 없으면 NotFoundException을 던진다', async () => {
      // Arrange
      mockSavedRouteRepository.findByIdAndUserId.mockResolvedValue(null);

      // Act + Assert
      await expect(service.findOne(1, 999)).rejects.toThrow(NotFoundException);

      expect(mockSavedRouteRepository.findByIdAndUserId).toHaveBeenCalledWith(
        999,
        1,
      );
    });
  });

  describe('remove', () => {
    it('존재하지 않는 저장 루트를 삭제하면 NotFoundException을 던진다', async () => {
      // Arrange
      mockSavedRouteRepository.findById.mockResolvedValue(null);

      // Act + Assert
      await expect(service.remove(1, 999)).rejects.toThrow(NotFoundException);

      expect(mockSavedRouteRepository.deleteById).not.toHaveBeenCalled();
    });

    it('다른 사용자의 저장 루트를 삭제하면 ForbiddenException을 던진다', async () => {
      // Arrange
      mockSavedRouteRepository.findById.mockResolvedValue({
        id: 10,
        title: '다른 사람의 루트',
        savingAmount: 3000,
        savedAt: new Date(),
        userId: 2,
      });

      // Act + Assert
      await expect(service.remove(1, 10)).rejects.toThrow(ForbiddenException);

      expect(mockSavedRouteRepository.deleteById).not.toHaveBeenCalled();
    });

    it('본인의 저장 루트는 정상적으로 삭제한다', async () => {
      // Arrange
      mockSavedRouteRepository.findById.mockResolvedValue({
        id: 10,
        title: '내 루트',
        savingAmount: 3000,
        savedAt: new Date(),
        userId: 1,
      });

      mockSavedRouteRepository.deleteById.mockResolvedValue(undefined);

      // Act
      const result = await service.remove(1, 10);

      // Assert
      expect(mockSavedRouteRepository.deleteById).toHaveBeenCalledWith(10);

      expect(result).toEqual({
        message: '저장 루트가 삭제되었습니다.',
      });
    });
  });
});
