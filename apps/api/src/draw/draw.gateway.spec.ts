import { Test, TestingModule } from '@nestjs/testing';
import { DrawGateway } from './draw.gateway';
import { DrawService } from './draw.service';

describe('DrawGateway', () => {
  let gateway: DrawGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DrawGateway, DrawService],
    }).compile();

    gateway = module.get<DrawGateway>(DrawGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
