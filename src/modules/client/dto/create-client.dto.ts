import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
export class CreateClientDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly nickname: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  readonly image?: string;
}
