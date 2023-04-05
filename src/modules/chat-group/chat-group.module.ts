import { Module } from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { ChatGroupController } from './chat-group.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ChatGroupController],
  providers: [ChatGroupService],
})
export class ChatgroupModule {}
