import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoinChatDto } from './dto/join-chat.dto';
import { ClientStatus } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createChatDto: CreateChatDto) {
    const { chatid, content, clientId } = createChatDto;
    return await this.prismaService.chatMessage.create({
      data: {
        chat: {
          connect: {
            id: chatid,
          },
        },
        client: {
          connect: {
            id: clientId,
          },
        },
        content,
      },
    });
  }

  async join(payload: JoinChatDto) {
    const { chatId, clientId } = payload;
    return await this.prismaService.chatmember.create({
      data: {
        chat: {
          connect: {
            id: chatId,
          },
        },
        client: {
          connect: {
            id: clientId,
          },
        },
        status: ClientStatus.INCHATGROUP,
        lastread: Date(),
      },
    });
  }

  async leave(payload: JoinChatDto) {
    const { chatId, clientId } = payload;
    await this.prismaService.chatmember.delete({
      where: {
        clientId_chatId: {
          chatId: chatId,
          clientId: clientId,
        },
      },
    });
  }

  async getAllHistoryMessageByChatId(chatId: number) {
    return await this.prismaService.chatMessage.findMany({
      where: {
        chatId: chatId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  async getUnreadMessageInChatGroup(chatId: number, clientId: number) {
    const { lastread, status } = await this.prismaService.chatmember.findUnique(
      {
        where: {
          clientId_chatId: {
            chatId,
            clientId,
          },
        },
      },
    );
    if (status === ClientStatus.INCHATGROUP) {
      return 0;
    }
    return await this.prismaService.chatMessage.findMany({
      where: {
        chatId: chatId,
        createdAt: {
          gte: lastread,
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }
}
