import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrganizacionService } from '../organizacion/organizacion.service';
import { UsuarioService } from './usuario.service';
import { AdminService } from 'src/admin/admin.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { AdminAuthGuard } from '../admin/admin-auth.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService,
    private readonly organizacionService: OrganizacionService,
    private readonly adminService: AdminService,
  ) {}

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Post()
  async create(@Body() createUsuarioDto: CreateUsuarioDto) {
    const createdUsuario = await  this.usuarioService.create(createUsuarioDto);
    await this.organizacionService.addUsuario(createUsuarioDto.organizacionId, createdUsuario.id);
    return createdUsuario;
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Get()
  findAll() {
    return this.usuarioService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }

  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }

  @Post('checkLogin')
  async checkLogin(@Body() body: { email: string }) { 
    const { email } = body; 
    const userExists = await this.usuarioService.checkUserExistsAndIsActive(email);

    const user = await this.usuarioService.findByEmail(email);
    const isAdmin = await this.adminService.isAdmin(user._id as string);
    console.log(isAdmin);
    const rol = isAdmin? "Admin" : "User";
    return { exists: userExists, rol: rol, user: user }; 
  }
}
