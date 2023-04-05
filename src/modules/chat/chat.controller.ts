import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { ChatService } from './chat.service';
import { FastifyReply } from 'fastify';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/:chatGroupId')
  async getAllHistoryMessageByChatId(
    @Param('chatGroupId') chatGroupId: string,
    @Res() response: FastifyReply,
  ) {
    const messages = await this.chatService.getAllHistoryMessageByChatId(
      +chatGroupId,
    );
    response.status(HttpStatus.OK).send(messages);
  }

  @Get('/:clientId/unread/:chatId')
  async getUnreadMessages(
    @Param('clientId') clientId: string,
    @Param('chatId') chatId: string,
    @Res() response: FastifyReply,
  ) {
    const unreadMessages = await this.chatService.getUnreadMessageInChatGroup(
      +chatId,
      +clientId,
    );
    response.status(HttpStatus.OK).send(unreadMessages);
  }
}
