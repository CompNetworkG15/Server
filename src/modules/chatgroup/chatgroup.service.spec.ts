import { Test, TestingModule } from '@nestjs/testing';
import { ChatgroupService } from './chatgroup.service';

describe('ChatgroupService', () => {
  let service: ChatgroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatgroupService],
    }).compile();

    service = module.get<ChatgroupService>(ChatgroupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
