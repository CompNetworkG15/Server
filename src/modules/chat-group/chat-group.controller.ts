import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  Req,
  UploadedFile,
  ParseIntPipe,
} from '@nestjs/common';
import { ChatGroupService, DisplayChat } from './chat-group.service';
import { CreateChatGroupDto } from './dto/create-chatGroup.dto';
import { UpdateChatGroupDto } from './dto/update-chatGroup.dto';
import { FastifyReply, FastifyRequest } from 'fastify';
import { throwErrorException } from 'src/utils/error';
import { SearchChatGroupDto } from './dto/search-chatGroup.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FastifyFileInterceptor } from 'nest-fastify-multer';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/upload-image-config';
import { fileMapper } from 'src/utils/file-mapper';
import { UpdateChatMemberDto } from './dto/update-chatmember.dto';
import { ChatService } from '../chat/chat.service';
import { JoinChatDto } from '../chat/dto/join-chat.dto';
@Controller('chatgroup')
export class ChatGroupController {
  constructor(
    private readonly chatgroupService: ChatGroupService,
    private readonly chatService: ChatService,
  ) {}

  @ApiConsumes('multipart/form-data')
  @Post(':clientId')
  @FastifyFileInterceptor('image', {
    storage: diskStorage({
      destination: './images/group-profile/', // path where the file will be downloaded
      filename: editFileName, // here you can put your own function to edit multer file name when saving to local disk
    }),
    fileFilter: imageFileFilter, // here you can put your own function to filter the received files
  })
  async create(
    @Body() createChatgroupDto: CreateChatGroupDto,
    @Res() response: FastifyReply,
    @Req() request: FastifyRequest,
    @Param('clientId', ParseIntPipe) clientId: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      let chatgroup = await this.chatgroupService.create(createChatgroupDto);
      await this.chatService.join({ chatId: chatgroup.id, clientId: clientId });
      if (file) {
        const photoUrl = fileMapper({ file, request });
        chatgroup = await this.chatgroupService.uploadImage(
          chatgroup.id,
          photoUrl.filename,
        );
      }
      response.status(HttpStatus.CREATED).send(chatgroup);
    } catch (error) {
      throwErrorException(error);
    }
  }

  @Post('/join')
  async joinChatGroup(
    @Res() response: FastifyReply,
    @Body() payload: JoinChatDto,
  ) {
    try {
      const chatmember = await this.chatService.join(payload);
      response.status(HttpStatus.OK).send(chatmember);
    } catch (error) {
      console.log(error);
      throwErrorException(error);
    }
  }

  @Get('/all-group/:clientId')
  async findAll(
    @Query() searchChatGroupDto: SearchChatGroupDto,
    @Param('clientId') clientId: string,
    @Res() response: FastifyReply,
  ) {
    try {
      const chatGroups = await this.chatgroupService.findAll(
        searchChatGroupDto,
        +clientId,
      );
      const formatData = this.chatgroupService.formatMany(
        +clientId,
        chatGroups,
        searchChatGroupDto,
      );
      response.status(HttpStatus.OK).send(formatData);
    } catch (error) {
      throwErrorException(error);
    }
  }

  @Get('/own-group/:clientId')
  async findchatGroupsByClientId(
    @Query() SearchChatGroupDto: SearchChatGroupDto,
    @Param('clientId') clientId: string,
    @Res() response: FastifyReply,
  ) {
    try {
      const chatGroups = await this.chatgroupService.findChatGroupsByClientId(
        SearchChatGroupDto,
        +clientId,
      );
      const formatData = this.chatgroupService.formatMany(
        +clientId,
        chatGroups,
        SearchChatGroupDto,
      );

      response.status(HttpStatus.OK).send(formatData);
    } catch (error) {
      throwErrorException(error);
    }
  }
  @Get('/own-group/:clientId/:chatId')
  async findOne(
    @Param('chatId') chatId: string,
    @Param('clientId') clientId: string,
    @Res() response: FastifyReply,
  ) {
    try {
      const chatGroup = await this.chatgroupService.findOne(+chatId);
      const formatChatGroup = this.chatgroupService.formatOne(
        +clientId,
        chatGroup,
      );
      response.status(HttpStatus.OK).send(formatChatGroup);
    } catch (error) {
      throwErrorException(error);
    }
  }

  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @FastifyFileInterceptor('image', {
    storage: diskStorage({
      destination: './images/group-profile/', // path where the file will be downloaded
      filename: editFileName, // here you can put your own function to edit multer file name when saving to local disk
    }),
    fileFilter: imageFileFilter, // here you can put your own function to filter the received files
  })
  async update(
    @Param('id') id: string,
    @Body() updateChatgroupDto: UpdateChatGroupDto,
    @Res() response: FastifyReply,
    @Req() request: FastifyRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      let chatgroup = await this.chatgroupService.update(
        +id,
        updateChatgroupDto,
      );
      if (file) {
        const photoUrl = fileMapper({ file, request });
        chatgroup = await this.chatgroupService.uploadImage(
          chatgroup.id,
          photoUrl.filename,
        );
      }
      response.status(HttpStatus.OK).send(chatgroup);
    } catch (error) {
      throwErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: FastifyReply) {
    try {
      const chatGroup = await this.chatgroupService.remove(+id);
      response.status(HttpStatus.OK).send(chatGroup);
    } catch (error) {
      throwErrorException(error);
    }
  }
  @Patch('/updateStatus')
  async updateStatus(
    @Body() updateChatMemberDto: UpdateChatMemberDto,
    @Res() response: FastifyReply,
  ) {
    try {
      const memberStatus = await this.chatgroupService.updateStatus(
        updateChatMemberDto,
      );
      response.status(HttpStatus.OK).send(memberStatus);
    } catch (error) {
      throwErrorException(error);
    }
  }
}
