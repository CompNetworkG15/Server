import { Injectable } from '@nestjs/common';
import { CreateChatGroupDto } from './dto/create-chatGroup.dto';
import { UpdateChatGroupDto } from './dto/update-chatGroup.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchChatGroupDto } from './dto/search-chatGroup.dto';
import { UpdateChatMemberDto } from './dto/update-chatmember.dto';
import { Chat, ChatType } from '@prisma/client';
export type DisplayChat = Chat & {
  chatMembers: {
    client: {
      image: string;
      id: number;
      nickname: string;
    };
  }[];
};

@Injectable()
export class ChatGroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createChatgroupDto: CreateChatGroupDto) {
    const { image, ...otherProps } = createChatgroupDto;
    return await this.prismaService.chat.create({ data: otherProps });
  }
  async findAllDirect(clientId: number) {
    return await this.prismaService.chat.findMany({
      where: {
        chatType: ChatType.DIRECT,
        chatMembers: {
          some: {
            clientId: clientId,
          },
        },
      },
      include: {
        chatMembers: {
          select: {
            client: {
              select: {
                id: true,
                image: true,
                nickname: true,
              },
            },
          },
        },
      },
    });
  }
  async findAllGroup() {
    return await this.prismaService.chat.findMany({
      where: {
        chatType: ChatType.GROUP,
      },
      include: {
        chatMembers: {
          select: {
            client: {
              select: {
                id: true,
                image: true,
                nickname: true,
              },
            },
          },
        },
      },
    });
  }
  async findAll(searchChatGroupDto: SearchChatGroupDto, clientId: number) {
    const { chatType, name } = searchChatGroupDto;
    let displayChat: DisplayChat[];
    switch (chatType) {
      case ChatType.DIRECT:
        displayChat = await this.findAllDirect(clientId);
        break;
      case ChatType.GROUP:
        displayChat = await this.findAllGroup();
        break;
      default:
        const [groupChat, directChat] = await Promise.all([
          this.findAllGroup(),
          this.findAllDirect(clientId),
        ]);
        displayChat = groupChat.concat(directChat);
        displayChat.concat();
        displayChat.sort((chat1, chat2) => {
          return chat1.id - chat2.id;
        });
        break;
    }
    return displayChat;
  }

  async findChatGroupsByClientId(
    searchChatGroupDto: SearchChatGroupDto,
    clientId: number,
  ) {
    const { chatType, name } = searchChatGroupDto;
    return await this.prismaService.chat.findMany({
      where: {
        chatType: chatType,
        chatMembers: {
          some: {
            clientId: clientId,
          },
        },
      },
      include: {
        chatMembers: {
          select: {
            client: {
              select: {
                id: true,
                image: true,
                nickname: true,
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.chat.findUnique({
      where: { id: id },
      include: {
        chatMembers: {
          include: {
            client: true,
          },
        },
      },
    });
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

  removeExcessKeyInChatMember(displayChat: DisplayChat) {
    const formattedChatMember = displayChat.chatMembers.map((member) => {
      return { ...member.client };
    });
    return formattedChatMember;
  }

  formatOne(clientId: number, ChatGroup: DisplayChat) {
    const formattedChatMember = this.removeExcessKeyInChatMember(ChatGroup);
    let { name, image } = ChatGroup;
    if (ChatGroup.chatType === ChatType.DIRECT) {
      for (let member of formattedChatMember) {
        if (member.id !== clientId) {
          name = member.nickname;
          image = member.image;
          break;
        }
      }
    }
    return {
      ...ChatGroup,
      chatMembers: formattedChatMember,
      name: name,
      image: image,
    };
  }

  formatMany(
    clientId: number,
    ChatGroups: DisplayChat[],
    searchChatGroupDto: SearchChatGroupDto,
  ) {
    const newData = ChatGroups.map((group) => {
      return this.formatOne(clientId, group);
    });
    const { name } = searchChatGroupDto;
    const filterNewData = name
      ? newData.filter((element) => {
          return element.name.toLowerCase().includes(name);
        })
      : newData;
    return filterNewData;
  }
}
