// import { MessageType } from '@prisma/client';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  readonly content: string;

  @IsNumber()
  readonly chatId: number;

  @IsNumber()
  readonly clientId: number;

  // @IsEnum(MessageType)
  // readonly messageType: MessageType;
}
