import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { JoinChatDto } from './dto/join-chat.dto';
import { Server, Socket } from 'socket.io';
import { throwErrorException } from 'src/utils/error';
// import { MessageType } from '@prisma/client';

@WebSocketGateway(2000, { cors: '*' })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async create(@MessageBody() payload: CreateChatDto) {
    try {
      const messageContent = await this.chatService.create(payload);
      const { nickname } = await this.chatService.getClientNickname(
        payload.clientId,
      );
      this.server
        .to(payload.chatId.toString())
        .emit('message', { ...messageContent, nickname: nickname });
    } catch (error) {
      throwErrorException(error);
    }
  }

  @SubscribeMessage('join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinChatDto,
  ) {
    try {
      await client.join(payload.chatId.toString());
      // const { nickname } = await this.chatService.getClientNickname(
      //   payload.clientId,
      // );
      // const chatPayload: CreateChatDto = {
      //   ...payload,
      //   content: `${nickname} has joined the room`,messageType:MessageType.SYSTEM
      // };
      // this.server.to(payload.chatId.toString()).emit('message', {
      //   ...chatPayload,
      //   createdAt: Date(),
      //   nickname: nickname,
      // });
    } catch (error) {
      throwErrorException(error);
    }
  }

  @SubscribeMessage('leave')
  async handleleave(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinChatDto,
  ) {
    try {
      await client.leave(payload.chatId.toString());
      // await this.chatService.leave(payload);

      // const { nickname } = await this.chatService.getClientNickname(
      //   payload.clientId,
      // );
      // const chatPayload: CreateChatDto = {
      //   ...payload,
      //   content: `${nickname} has left the room`,
      //   messageType:MessageType.SYSTEM
      // };
      // this.server.to(payload.chatId.toString()).emit('message', {
      //   ...chatPayload,
      //   createdAt: Date(),
      //   nickname: nickname,
      // });
    } catch (error) {
      throwErrorException(error);
    }
  }

  @SubscribeMessage('newJoiner')
  async findall(@MessageBody() hasNewMember: boolean) {
    this.server.emit('newJoiner', true);
  }
}
