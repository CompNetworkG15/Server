import { ApiProperty } from '@nestjs/swagger';
import { ChatType } from '@prisma/client';
import { IsString, IsArray, IsEnum, IsOptional } from 'class-validator';

export class SearchChatGroupDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name: string = '';

  @ApiProperty({ enum: ChatType, required: false })
  @IsEnum(ChatType)
  @IsOptional()
  readonly chatType?: ChatType;
}
