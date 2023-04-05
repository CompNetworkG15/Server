import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChatGroupDto } from './create-chatGroup.dto';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ChatType } from '@prisma/client';

export class UpdateChatGroupDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  readonly image?: string;
}
