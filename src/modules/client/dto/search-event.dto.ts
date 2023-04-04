import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchClientDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly name: string = '';
}
