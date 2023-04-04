import { PartialType } from '@nestjs/swagger';
import { CreateChatGroupDto } from './create-chatGroup.dto';

export class UpdateChatGroupDto extends PartialType(CreateChatGroupDto) {}
