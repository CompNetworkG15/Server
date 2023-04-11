import { ApiProperty } from '@nestjs/swagger';
import { ChatType } from '@prisma/client';
import { IsString, IsArray, IsEnum } from 'class-validator';

export class CreateChatGroupDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty({ enum: ChatType })
  @IsEnum(ChatType)
  readonly chatType: ChatType;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  readonly image?: string;
}
