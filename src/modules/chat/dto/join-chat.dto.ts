import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { IsInt } from 'class-validator';

export class JoinChatDto {
  @IsInt()
  readonly chatId: number;

  @IsInt()
  readonly clientId: number;
}
