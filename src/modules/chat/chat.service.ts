import { Injectable } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { JoinChatDto } from './dto/join-chat.dto';

@Injectable()
export class ChatService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createChatDto: CreateChatDto) {
    const { chatid, content, ownerId } = createChatDto;
    return await this.prismaService.chatMessage.create({
      data: {
        chat: {
          connect: {
            id: chatid,
          },
        },
        client: {
          connect: {
            id: ownerId,
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
}
