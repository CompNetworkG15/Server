import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SearchClientDto } from './dto/search-event.dto';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createClientDto: CreateClientDto) {
    const { image, ...otherprops } = createClientDto;
    return await this.prismaService.client.create({
      data: {
        ...otherprops,
      },
    });
  }

  async findAll(searchClientDto: SearchClientDto) {
    return await this.prismaService.client.findMany({
      where: {
        nickname: {
          contains: searchClientDto.nickname,
          mode: 'insensitive',
        },
      },
    });
  }

  async findOne(id: number) {
    return await this.prismaService.client.findUnique({ where: { id: id } });
  }

  async findClientByEmail(email: string) {
    return await this.prismaService.client.findUnique({
      where: { email: email },
    });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const { image, ...otherprops } = updateClientDto;
    return await this.prismaService.client.update({
      where: { id: id },
      data: {
        ...otherprops,
      },
    });
  }

  async remove(id: number) {
    await this.prismaService.client.delete({ where: { id: id } });
    return ` remove client id: ${id} successful`;
  }

  async uploadImage(id: number, filename: string) {
    return await this.prismaService.client.update({
      where: { id: id },
      data: {
        image: 'images/user-profile/' + filename,
      },
    });
  }
}
