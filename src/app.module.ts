import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { ClientModule } from './modules/client/client.module';
import { ChatgroupModule } from './modules/chat-group/chat-group.module';
import { ChatModule } from './modules/chat/chat.module';

@Module({
  imports: [ClientModule, ChatgroupModule, ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
