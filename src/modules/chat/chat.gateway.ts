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

@WebSocketGateway(2000, { cors: '*' })
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}
  @WebSocketServer() server: Server;

  @SubscribeMessage('message')
  async create(@MessageBody() payload: CreateChatDto) {
    await this.chatService.create(payload);
    this.server.to(payload.chatid.toString()).emit('message', payload);
  }

  @SubscribeMessage('join')
  async handleJoin(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinChatDto,
  ) {
    client.join(payload.chatId.toString());
    await this.chatService.join(payload);
    // this.server.to(payload.chatId.toString()).emit('message');
  }

  @SubscribeMessage('leave')
  async handleleave(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: JoinChatDto,
  ) {
    await this.chatService.leave(payload);
    client.leave(payload.chatId.toString());
  }
}
