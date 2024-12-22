import { Controller, Get, Post, Body, Put, Param, Delete, Patch } from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';

@Controller('organizacion')
export class OrganizacionController {
  constructor(private readonly organizacionService: OrganizacionService,
    private readonly usuarioService: UsuarioService
  ) {}

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

  @Get(':id/usuarios')
  findUsuariosByOrganizacion(@Param('id') id: string) {
    return this.organizacionService.findUsuariosByOrganizacion(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrganizacionDto: UpdateOrganizacionDto) {
    return this.organizacionService.update(id, updateOrganizacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizacionService.remove(id);
  }

  @Delete(':orgId/usuario/:usuarioId') 
  removeUsuarioFromOrganizacion(@Param('orgId') orgId: string, @Param('usuarioId') usuarioId: string) {
    let updateUsuarioDto = new UpdateUsuarioDto();
    updateUsuarioDto.organizacionId=null;
    this.usuarioService.update(usuarioId,updateUsuarioDto);
   return this.organizacionService.removeUsuarioFromOrganizacion(orgId, usuarioId); 
  }

  @Get(':orgId/usuarios-no-asignados') 
  findUsuariosNoAsignados() { 
    return this.usuarioService.findUsuariosNoAsignados(); 
  }

  @Post(':orgId/usuario/:usuarioId')
  addUsuarioToOrganizacion(@Param('orgId') orgId: string, @Param('usuarioId') usuarioId: string) {
    let updateUsuarioDto = new UpdateUsuarioDto();
    updateUsuarioDto.organizacionId=orgId;
    this.usuarioService.update(usuarioId,updateUsuarioDto);
    return this.organizacionService.addUsuario(orgId,usuarioId);
  }

  @Get(':orgId/proyectos')
  findProyectosByOrganizacion(@Param('orgId') orgId: string) {
    return this.organizacionService.findProyectosByOrganizacion(orgId);
  }
}
