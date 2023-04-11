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
  Req,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FastifyFileInterceptor } from 'nest-fastify-multer';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/upload-image-config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { throwErrorException } from 'src/utils/error';
import { fileMapper } from 'src/utils/file-mapper';
import { SearchClientDto } from './dto/search-client.dto';
import { LoginDto } from './dto/login.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @ApiConsumes('multipart/form-data')
  @Post()
  @FastifyFileInterceptor('image', {
    storage: diskStorage({
      destination: './images/client-profile/', // path where the file will be downloaded
      filename: editFileName, // here you can put your own function to edit multer file name when saving to local disk
    }),
    fileFilter: imageFileFilter, // here you can put your own function to filter the received files
  })
  async create(
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
    @Body() createClientDto: CreateClientDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      let client = await this.clientService.create(createClientDto);
      if (file) {
        const photoUrl = fileMapper({ file, request });
        client = await this.clientService.uploadImage(
          client.id,
          photoUrl.filename,
        );
      }
      response.status(HttpStatus.CREATED).send(client);
    } catch (error) {
      throwErrorException(error);
    }
  }

  @Get()
  async findAll(
    @Query() searchClientDto: SearchClientDto,
    @Res() response: FastifyReply,
  ) {
    try {
      const clients = await this.clientService.findAll(searchClientDto);
      response.status(HttpStatus.OK).send(clients);
    } catch (error) {
      throwErrorException(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() response: FastifyReply) {
    try {
      const client = await this.clientService.findOne(+id);
      response.status(HttpStatus.OK).send(client);
    } catch (error) {
      throwErrorException(error);
    }
  }
  @Post('/login')
  async findByEmail(@Res() response: FastifyReply, @Body() loginDto: LoginDto) {
    try {
      const client = await this.clientService.findClientByEmail(loginDto.email);
      response.status(HttpStatus.OK).send(client);
    } catch (error) {
      throwErrorException(error);
    }
  }
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @FastifyFileInterceptor('image', {
    storage: diskStorage({
      destination: './images/client-profile/', // path where the file will be downloaded
      filename: editFileName, // here you can put your own function to edit multer file name when saving to local disk
    }),
    fileFilter: imageFileFilter, // here you can put your own function to filter the received files
  })
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Req() request: FastifyRequest,
    @Res() response: FastifyReply,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      let client = await this.clientService.update(+id, updateClientDto);
      if (file) {
        const photoUrl = fileMapper({ file, request });
        client = await this.clientService.uploadImage(+id, photoUrl.filename);
      }
      response.status(HttpStatus.OK).send(client);
    } catch (error) {
      throwErrorException(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() response: FastifyReply) {
    try {
      const message = await this.clientService.remove(+id);
      response.status(HttpStatus.OK).send(message);
    } catch (error) {
      throwErrorException(error);
    }
  }
}
