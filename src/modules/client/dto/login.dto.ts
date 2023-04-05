import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  readonly email: string;
}
