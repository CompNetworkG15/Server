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

@WebSocketGateway(2000, { cors: '*' })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async create(@MessageBody() payload: CreateChatDto) {
    try {
      await this.chatService.create(payload);
      this.server.to(payload.chatId.toString()).emit('message', payload);
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
      // await this.chatService.join(payload);
      // const chatPayload: CreateChatDto = {
      //   ...payload,
      //   content: `Client Id ${payload.clientId} has joined the room`,
      // };
      // await this.chatService.create(chatPayload);
      // this.server.to(payload.chatId.toString()).emit('message', chatPayload);
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
      // const chatPayload: CreateChatDto = {
      //   ...payload,
      //   content: `Client Id ${payload.clientId} has left the room`,
      // };
      // await this.chatService.create(chatPayload);
      // this.server.to(payload.chatId.toString()).emit('message', chatPayload);
      await client.leave(payload.chatId.toString());
      // await this.chatService.leave(payload);
    } catch (error) {
      throwErrorException(error);
    }
  }

  @SubscribeMessage('newJoiner')
  async findall(@MessageBody() hasNewMember: boolean) {
    console.log('receive');
    this.server.emit('newJoiner', true);
  }
}
