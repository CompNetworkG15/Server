import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

// you can add validate using class-validator
export class SingleFileDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  photo_url: string;

  @ApiProperty({ example: 'nat@eiei.com' })
  @IsEmail()
  email: string;
}
