import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { OrganizacionService } from '../organizacion/organizacion.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AdminAuthGuard } from '../admin/admin-auth.guard';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService,
    private readonly organizacionService: OrganizacionService
  ) {}

  @Post()
  async create(@Body() createProyectoDto: CreateProyectoDto) {
    try {
      let expediente = await this.organizacionService.obtainExpediente(createProyectoDto.organizacionId);
      expediente += await this.proyectoService.obtainPartida(new Date().getFullYear());
      createProyectoDto.expediente = expediente;
      const createdProyecto = await this.proyectoService.create(createProyectoDto);
      await this.organizacionService.addProyecto(createProyectoDto.organizacionId, createdProyecto.id);
      return createdProyecto;
    } catch (error) { 
      console.error('Error al crear proyecto:', error); 
      return error;
    }
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectoService.update(id, updateProyectoDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/planos')
  findPlanosByProyecto(@Param('id') id: string){
    return this.proyectoService.findPlanosByProyecto(id);
  }
}
