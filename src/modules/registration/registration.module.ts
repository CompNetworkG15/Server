import { Module } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { RegistrationController } from './registration.controller';
import { ClientModule } from '../client/client.module';
import { ChatModule } from '../chat/chat.module';
import { ChatgroupModule } from '../chat-group/chat-group.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [ClientModule, ChatgroupModule, ChatModule, PrismaModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
