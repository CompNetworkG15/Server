import { IsNumber, IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  readonly content: string;

  @IsNumber()
  readonly chatid: number;

  @IsNumber()
  readonly ownerId: number;
}
