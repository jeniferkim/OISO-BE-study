import { Test, TestingModule } from '@nestjs/testing';
import { SavedRouteController } from './saved-route.controller';

describe('SavedRouteController', () => {
  let controller: SavedRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedRouteController],
    }).compile();

    controller = module.get<SavedRouteController>(SavedRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
