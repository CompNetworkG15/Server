import { Test, TestingModule } from '@nestjs/testing';
import { ChatgroupController } from './chatgroup.controller';
import { ChatgroupService } from './chatgroup.service';

describe('ChatgroupController', () => {
  let controller: ChatgroupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatgroupController],
      providers: [ChatgroupService],
    }).compile();

    controller = module.get<ChatgroupController>(ChatgroupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
