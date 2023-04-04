import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ChatGroupService } from './chat-group.service';
import { CreateChatGroupDto } from './dto/create-chatGroup.dto';
import { UpdateChatGroupDto } from './dto/update-chatGroup.dto';

@Controller('chatgroup')
export class ChatGroupController {
  constructor(private readonly chatgroupService: ChatGroupService) {}

  @Post()
  create(@Body() createChatgroupDto: CreateChatGroupDto) {
    return this.chatgroupService.create(createChatgroupDto);
  }

  @Get()
  findAll() {
    return this.chatgroupService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chatgroupService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChatgroupDto: UpdateChatGroupDto,
  ) {
    return this.chatgroupService.update(+id, updateChatgroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chatgroupService.remove(+id);
  }
}
