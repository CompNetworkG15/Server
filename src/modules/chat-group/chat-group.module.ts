import { Module } from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { ChatGroupController } from './chat-group.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [PrismaModule, ChatModule],
  controllers: [ChatGroupController],
  providers: [ChatGroupService],
  exports: [ChatGroupService],
})
export class ChatgroupModule {}
