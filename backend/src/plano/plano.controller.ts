import { Controller, Post, Get, Delete, Patch, Body, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PlanoService } from './plano.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { ProyectoService } from '../proyecto/proyecto.service';
import { Express } from 'express';

@Controller('plano')
export class PlanoController {
  constructor(
    private readonly planoService: PlanoService,
    private readonly proyectoService: ProyectoService
  ) {}
  
    //chequeo JWT + obtener usuarioMail
    @Post()
    @UseInterceptors(FileInterceptor('archivo'))
    async create(
      @Body() createPlanoDto: CreatePlanoDto,
      @UploadedFile() file: Express.Multer.File
    ) {
      try{
        if (!file) {
          console.error("Archivo no recibido");
        }
        
        createPlanoDto.archivo = file.buffer;
        createPlanoDto.nombreArchivo = file.originalname;
        //createPlanoDto.usuarioMail = JWT.user.mail //como sea que se obtiene el mail
        
        const createdPlano = await this.planoService.create(createPlanoDto);
        await this.proyectoService.addPlano(createPlanoDto.proyectoId, createdPlano.id);
        return createdPlano;
      } catch (error) {
        console.error('Error al crear el plano:', error);
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
