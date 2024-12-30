import { Controller, Get, Post, Body, Put, Param, Delete, Patch, UseGuards } from '@nestjs/common';
import { OrganizacionService } from './organizacion.service';
import { UsuarioService } from '../usuario/usuario.service';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AdminAuthGuard } from '../admin/admin-auth.guard';

@Controller('organizacion')
export class OrganizacionController {
  constructor(private readonly organizacionService: OrganizacionService,
    private readonly usuarioService: UsuarioService
  ) {}

  //@UseGuards(JwtAuthGuard, AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createOrganizacionDto: CreateOrganizacionDto) {
    return this.organizacionService.create(createOrganizacionDto);
  }

  //@UseGuards(JwtAuthGuard, AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.organizacionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizacionService.findOne(id);
  }

  //@UseGuards(JwtAuthGuard, AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':id/usuarios')
  findUsuariosByOrganizacion(@Param('id') id: string) {
    return this.organizacionService.findUsuariosByOrganizacion(id);
  }

  //@UseGuards(JwtAuthGuard, AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateOrganizacionDto: UpdateOrganizacionDto) {
    return this.organizacionService.update(id, updateOrganizacionDto);
  }

  //@UseGuards(JwtAuthGuard, AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organizacionService.remove(id);
  }

  //@UseGuards(JwtAuthGuard, AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':orgId/usuario/:usuarioId') 
  removeUsuarioFromOrganizacion(@Param('orgId') orgId: string, @Param('usuarioId') usuarioId: string) {
    let updateUsuarioDto = new UpdateUsuarioDto();
    updateUsuarioDto.organizacionId=null;
    this.usuarioService.update(usuarioId,updateUsuarioDto);
   return this.organizacionService.removeUsuarioFromOrganizacion(orgId, usuarioId); 
  }

  //@UseGuards(JwtAuthGuard, AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  @Get(':orgId/usuarios-no-asignados') 
  findUsuariosNoAsignados() { 
    return this.usuarioService.findUsuariosNoAsignados(); 
  }

  //@UseGuards(JwtAuthGuard, AdminAuthGuard) 
  //@UseGuards(JwtAuthGuard) aca paso algo, no autoriza por mas que envie el token
  @Post(':orgId/usuario/:usuarioId')
  addUsuarioToOrganizacion(@Param('orgId') orgId: string, @Param('usuarioId') usuarioId: string) {
    console.log("Añadir user: ", orgId, "  ..  ", usuarioId); 
    let updateUsuarioDto = new UpdateUsuarioDto();
    updateUsuarioDto.organizacionId=orgId;
    this.usuarioService.update(usuarioId,updateUsuarioDto);
    return this.organizacionService.addUsuario(orgId,usuarioId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':orgId/proyectos')
  findProyectosByOrganizacion(@Param('orgId') orgId: string) {
    return this.organizacionService.findProyectosByOrganizacion(orgId);
  }
}
