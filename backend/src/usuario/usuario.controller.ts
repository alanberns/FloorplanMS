import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganizacionService } from '../organizacion/organizacion.service';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService,
    private readonly organizacionService: OrganizacionService
  ) {}

  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const createdUsuario = await  this.usuarioService.create(createUsuarioDto);
    await this.organizacionService.addUsuario(createUsuarioDto.organizacionId, createdUsuario.id);
    return createdUsuario;
  }

  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }

  @Post('checkLogin')
  async checkLogin(@Body() body: { email: string }) { 
    const { email } = body; const userExists = await this.usuarioService.checkUserExists(email); 
    return { exists: userExists }; // Asegúrate de retornar un booleano 
  }
}
