import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createClientDto: CreateClientDto) {
    return this.prismaService.client.create({ data: createClientDto });
  }

  async findAll() {
    return this.prismaService.client.findMany({});
  }

  async findOne(id: number) {
    return this.prismaService.client.findUnique({ where: { id: id } });
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    return this.prismaService.client.update({
      where: { id: id },
      data: updateClientDto,
    });
  }

  async remove(id: number) {
    await this.prismaService.client.delete({ where: { id: id } });
    return ` remove client id: ${id} successful`;
  }
}
