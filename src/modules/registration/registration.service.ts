import { Injectable } from '@nestjs/common';
import { ClientService } from '../client/client.service';
import { ChatService } from '../chat/chat.service';
import { ChatGroupService } from '../chat-group/chat-group.service';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { SearchClientDto } from '../client/dto/search-client.dto';
import { ChatType, Client } from '@prisma/client';
import { CreateChatGroupDto } from '../chat-group/dto/create-chatGroup.dto';
import { JoinChatDto } from '../chat/dto/join-chat.dto';

@Injectable()
export class RegistrationService {
  constructor(
    private readonly clientService: ClientService,
    private readonly chatService: ChatService,
    private readonly chatGroupService: ChatGroupService,
  ) {}
  async createClient(createClientDto: CreateClientDto) {
    const searchClientDto: SearchClientDto = { nickname: '' };
    const allClient = await this.clientService.findAll(searchClientDto);
    const newclient = await this.clientService.create(createClientDto);
    let results = [];
    allClient.forEach(async (client: Client) => {
      const CreateChatGroupDto: CreateChatGroupDto = {
        name: `${newclient.nickname},${client.nickname}`,
        chatType: ChatType.DIRECT,
      };
      const newGroup = await this.chatGroupService.create(CreateChatGroupDto);
      const oldmemberjoinChatDto: JoinChatDto = {
        chatId: newGroup.id,
        clientId: client.id,
      };
      const newmemberjoinChatDto: JoinChatDto = {
        chatId: newGroup.id,
        clientId: newclient.id,
      };
      results.push(
        this.chatService.join(oldmemberjoinChatDto),
        this.chatService.join(newmemberjoinChatDto),
      );
    });
    await Promise.all(results);
    return newclient;
  }
}
