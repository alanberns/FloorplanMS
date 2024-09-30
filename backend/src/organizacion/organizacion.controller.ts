import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { AddUsuarioDto } from '../usuario/dto/add-user.dto'

@Controller('organizacion')
export class OrganizacionController {
  constructor(private readonly organizacionService: OrganizacionService) {}

  @Post()
  create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
    return this.organizacionService.create(createOrganizacionDto);
  }

  @Get()
  findAll() {
    return this.organizacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizacionService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrganizacionDto: UpdateOrganizacionDto) {
    return this.organizacionService.update(id, updateOrganizacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizacionService.remove(id);
  }

  @Patch(':id/usuarios')
  async addUsuario(
    @Param('id') id: string,
    @Body() addUsuarioDto: AddUsuarioDto,
  ) {
    return this.organizacionService.addUsuario(id, addUsuarioDto.usuarioId);
  }
}