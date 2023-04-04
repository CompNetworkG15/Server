import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateClientDto {
  @ApiProperty()
  @IsString()
  readonly name: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  readonly image?: string;
}
