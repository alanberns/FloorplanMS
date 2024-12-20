import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { ProyectoService } from '../proyecto/proyecto.service';

@Controller('plano')
export class PlanoController {
  constructor(private readonly planoService: PlanoService,
    private readonly proyectoService: ProyectoService
  ) {}

  @Post()
  async create(@Body() createPlanoDto: CreatePlanoDto) {
    try{
      const createdPlano = await this.planoService.create(createPlanoDto);
      await this.proyectoService.addPlano(createPlanoDto.proyectoId, createdPlano.id);
      return createdPlano;
    } catch (error) { 
      console.error('Error al crear el plano:', error); 
      return error;
    }
  } 

  @Get()
  findAll() {
    return this.planoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanoDto: UpdatePlanoDto) {
    return this.planoService.update(id, updatePlanoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planoService.remove(id);
  }
}
