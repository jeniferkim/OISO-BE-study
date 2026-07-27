import { Test, TestingModule } from '@nestjs/testing';
import { SavedRouteService } from './saved-route.service';

describe('SavedRouteService', () => {
  let service: SavedRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedRouteService],
    }).compile();

    service = module.get<SavedRouteService>(SavedRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
