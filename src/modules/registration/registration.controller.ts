import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UploadedFile,
  HttpStatus,
} from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { CreateRegistrationDto } from './dto/create-registration.dto';
import { UpdateRegistrationDto } from './dto/update-registration.dto';
import { CreateClientDto } from '../client/dto/create-client.dto';
import { ApiConsumes } from '@nestjs/swagger';
import { FastifyFileInterceptor } from 'nest-fastify-multer';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/utils/upload-image-config';
import { FastifyReply, FastifyRequest } from 'fastify';
import { fileMapper } from 'src/utils/file-mapper';
import { ClientService } from '../client/client.service';
import { throwErrorException } from 'src/utils/error';

@Controller('client')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
    private readonly clientService: ClientService,
  ) {}

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
      let client = await this.registrationService.createClient(createClientDto);
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
}
