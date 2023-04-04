import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';
export class CreateClientDto {
  @IsString()
  readonly name: string;
  @IsOptional()
  readonly image?: string;
}
