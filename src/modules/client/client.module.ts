import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ChatgroupModule } from '../chat-group/chat-group.module';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [PrismaModule, ChatgroupModule, ChatModule],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
