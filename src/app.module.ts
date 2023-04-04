import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatGateway } from './chat.gateway';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule {}
