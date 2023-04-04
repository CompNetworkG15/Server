import { Injectable } from '@nestjs/common';
import { CreateChatGroupDto } from './dto/create-chatGroup.dto';
import { UpdateChatGroupDto } from './dto/update-chatGroup.dto';

@Injectable()
export class ChatGroupService {
  create(createChatgroupDto: CreateChatGroupDto) {
    
    return 'This action adds a new chatgroup';
  }

  findAll() {
    return `This action returns all chatgroup`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatgroup`;
  }

  update(id: number, updateChatgroupDto: UpdateChatGroupDto) {
    return `This action updates a #${id} chatgroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatgroup`;
  }
}
