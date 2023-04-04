import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { ClientModule } from './modules/client/client.module';
import { ChatgroupModule } from './modules/chatgroup/chatgroup.module';

@Module({
  imports: [ClientModule, ChatgroupModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
