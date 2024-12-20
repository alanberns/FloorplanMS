import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { OrganizacionService } from '../organizacion/organizacion.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService,
    private readonly organizacionService: OrganizacionService
  ) {}

  @Post()
  async create(@Body() createProyectoDto: CreateProyectoDto) {
    try {
      const createdProyecto = await this.proyectoService.create(createProyectoDto);
      await this.organizacionService.addProyecto(createProyectoDto.organizacionId, createdProyecto.id);
      return createdProyecto;
    } catch (error) { 
      console.error('Error al crear proyecto:', error); 
      return error;
    }
  }

  @Get()
  findAll() {
    return this.proyectoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.proyectoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
    return this.proyectoService.update(id, updateProyectoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.proyectoService.remove(id);
  }

  @Get(':id/planos')
  findPlanosByProyecto(@Param('id') id: string){
    return this.proyectoService.findPlanosByProyecto(id);
  }
}
