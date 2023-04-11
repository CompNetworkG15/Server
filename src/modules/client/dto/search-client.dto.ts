import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchClientDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  readonly nickname: string = '';
}
