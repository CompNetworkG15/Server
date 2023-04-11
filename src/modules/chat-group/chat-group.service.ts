import { Injectable } from '@nestjs/common';
import { CreateChatGroupDto } from './dto/create-chatGroup.dto';
import { UpdateChatGroupDto } from './dto/update-chatGroup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchChatGroupDto } from './dto/search-chatGroup.dto';
import { JoinChatDto } from '../chat/dto/join-chat.dto';
import { ClientStatus } from '@prisma/client';
import { UpdateChatMemberDto } from './dto/update-chatmember.dto';

@Injectable()
export class ChatGroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createChatgroupDto: CreateChatGroupDto) {
    const { image, ...otherProps } = createChatgroupDto;
    return await this.prismaService.chat.create({ data: otherProps });
  }

  async findAll(searchChatGroupDto: SearchChatGroupDto) {
    const { chatType, name } = searchChatGroupDto;
    return await this.prismaService.chat.findMany({
      where: {
        chatType: chatType,
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });
  }

  async findMyChatGroup(
    searchChatGroupDto: SearchChatGroupDto,
    clientId: number,
  ) {
    const { chatType, name } = searchChatGroupDto;
    return await this.prismaService.chat.findMany({
      where: {
        chatType: chatType,
        name: {
          contains: name,
          mode: 'insensitive',
        },
        chatMembers: {
          some: {
            clientId: clientId,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.chat.findUnique({ where: { id: id } });
  }

  async update(id: number, updateChatgroupDto: UpdateChatGroupDto) {
    const { image, ...otherprops } = updateChatgroupDto;
    return await this.prismaService.chat.update({
      where: { id: id },
      data: otherprops,
    });
  }

  async remove(id: number) {
    await this.prismaService.chat.delete({ where: { id: id } });
    return ` remove chat-group id: ${id} successful`;
  }
  //
  async uploadImage(id: number, filename: string) {
    return await this.prismaService.chat.update({
      where: { id: id },
      data: {
        image: 'images/group-profile/' + filename,
      },
    });
  }

  async updateStatus(updateChatMemberDto: UpdateChatMemberDto) {
    const { chatId, clientId, ...otherProps } = updateChatMemberDto;
    return await this.prismaService.chatmember.update({
      where: {
        clientId_chatId: {
          chatId: chatId,
          clientId: clientId,
        },
      },
      data: otherProps,
    });
  }
}
