import { Module } from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { ChatGroupController } from './chat-group.controller';

@Module({
  controllers: [ChatGroupController],
  providers: [ChatGroupService],
})
export class ChatgroupModule {}
