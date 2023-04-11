import { ApiProperty } from '@nestjs/swagger';
import { ClientStatus } from '@prisma/client';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';

export class UpdateChatMemberDto {
  @ApiProperty()
  @IsInt()
  readonly chatId: number;

  @ApiProperty()
  @IsInt()
  readonly clientId: number;

  @ApiProperty({ required: false, type: Date })
  @IsDateString()
  @IsOptional()
  readonly lastread?: string;

  @ApiProperty({ required: false, enum: ClientStatus })
  @IsEnum(ClientStatus)
  @IsOptional()
  readonly status?: ClientStatus;
}
