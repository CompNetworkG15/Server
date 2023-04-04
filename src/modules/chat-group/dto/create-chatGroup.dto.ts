import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CreateChatGroupDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty()
  @IsArray()
  readonly members: number[]; // array of client ids

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image?: string;
}
