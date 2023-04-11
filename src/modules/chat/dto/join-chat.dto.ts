import { PartialType } from '@nestjs/mapped-types';
import { CreateChatDto } from './create-chat.dto';
import { IsInt } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class JoinChatDto {
  @ApiProperty()
  @IsInt()
  readonly chatId: number;
  @ApiProperty()
  @IsInt()
  readonly clientId: number;
}
