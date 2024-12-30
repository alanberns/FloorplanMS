import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/* app.controller.ts 

//PARA USAR EL TOKEN JWT
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api')
export class AppController {

  @UseGuards(JwtAuthGuard)
  @Get('data')
  getData() {
    return { message: 'This is protected data' };
  }

//PARA CHEQUEAR SI ES ADMIN
  import { AdminAuthGuard } from './admin-auth.guard';
  
  @Controller('api') 
  export class AppController { 
  
  @UseGuards(JwtAuthGuard, AdminAuthGuard)
  --ENDPOINT--
}


//CHEQUEO DE PLANO QUE PERTENEZCA A LA ORGANIZACION DEL USUARIO:
import { Controller, Put, Body, Param, Req, UseGuards, ForbiddenException } from '@nestjs/common'; 
import { JwtAuthGuard } from '../jwt-auth.guard'; import { PlanoService } from './plano.service'; 
import { UsuarioService } from '../usuario/usuario.service'; 

@Controller('plano') export class PlanoController { 
  constructor( private readonly planoService: PlanoService, private readonly usuarioService: UsuarioService, ) {} 
  
  @UseGuards(JwtAuthGuard) 
  @Put(':id') async updatePlano(@Param('id') planoId: string, @Body() updateDto: any, @Req() req: any) { 

    const userEmail = req.user.email; // Del token JWT decodificado 
    const user = await this.usuarioService.findByEmail(userEmail); 
    if (!user) { throw new ForbiddenException('User not found'); } 
    
    const plano = await this.planoService.findById(planoId); 
    if (!plano) { throw new ForbiddenException('Plano not found'); } 

    if (!plano.organizacion.equals(user.organizacion)) { throw new ForbiddenException('You do not have permission to modify this plano'); } 
    
    // Proceder con la actualización del plano 
    plano.set(updateDto); 
    return plano.save();



//CHEQUEO DE ACCESO A PROYECTOS:
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto } from './proyecto.schema';

@Injectable()
export class ProyectoService {
  constructor(@InjectModel(Proyecto.name) private proyectoModel: Model<Proyecto>) {}

  async findById(proyectoId: string): Promise<Proyecto | null> {
    return this.proyectoModel.findById(proyectoId).exec();
  }

  async belongsToOrganization(proyectoId: string, organizacionId: string): Promise<boolean> {
    const proyecto = await this.findById(proyectoId);
    return proyecto && proyecto.organizacion.equals(organizacionId);
  }
}

import { Controller, Get, Put, Param, Body, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { ProyectoService } from './proyecto.service';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('proyecto')
export class ProyectoController {
  constructor(
    private readonly proyectoService: ProyectoService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getProyecto(@Param('id') proyectoId: string, @Req() req: any) {
    const userEmail = req.user.email;
    const user = await this.usuarioService.findByEmail(userEmail);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const belongsToOrganization = await this.proyectoService.belongsToOrganization(proyectoId, user.organizacion);
    if (!belongsToOrganization) {
      throw new ForbiddenException('You do not have permission to access this project');
    }

    return this.proyectoService.findById(proyectoId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateProyecto(@Param('id') proyectoId: string, @Body() updateDto: any, @Req() req: any) {
    const userEmail = req.user.email;
    const user = await this.usuarioService.findByEmail(userEmail);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const belongsToOrganization = await this.proyectoService.belongsToOrganization(proyectoId, user.organizacion);
    if (!belongsToOrganization) {
      throw new ForbiddenException('You do not have permission to modify this project');
    }

    return this.proyectoService.updateById(proyectoId, updateDto);
  }
}



//CHEQUEO DE ACCESO A PLANOS
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plano } from './plano.schema';

@Injectable()
export class PlanoService {
  constructor(@InjectModel(Plano.name) private planoModel: Model<Plano>) {}

  async findById(planoId: string): Promise<Plano | null> {
    return this.planoModel.findById(planoId).exec();
  }

  async belongsToProject(planoId: string, proyectoId: string): Promise<boolean> {
    const plano = await this.findById(planoId);
    return plano && plano.proyecto.equals(proyectoId);
  }
}

import { Controller, Get, Put, Param, Body, Req, UseGuards, ForbiddenException } from '@nestjs/common';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { PlanoService } from './plano.service';
import { ProyectoService } from '../proyecto/proyecto.service';
import { UsuarioService } from '../usuario/usuario.service';

@Controller('plano')
export class PlanoController {
  constructor(
    private readonly planoService: PlanoService,
    private readonly proyectoService: ProyectoService,
    private readonly usuarioService: UsuarioService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getPlano(@Param('id') planoId: string, @Req() req: any) {
    const userEmail = req.user.email;
    const user = await this.usuarioService.findByEmail(userEmail);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const plano = await this.planoService.findById(planoId);
    if (!plano) {
      throw new ForbiddenException('Plano not found');
    }

    const belongsToOrganization = await this.proyectoService.belongsToOrganization(plano.proyecto.toString(), user.organizacion);
    if (!belongsToOrganization) {
      throw new ForbiddenException('You do not have permission to access this plano');
    }

    return plano;
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePlano(@Param('id') planoId: string, @Body() updateDto: any, @Req() req: any) {
    const userEmail = req.user.email;
    const user = await this.usuarioService.findByEmail(userEmail);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const plano = await this.planoService.findById(planoId);
    if (!plano) {
      throw new ForbiddenException('Plano not found');
    }

    const belongsToOrganization = await this.proyectoService.belongsToOrganization(plano.proyecto.toString(), user.organizacion);
    if (!belongsToOrganization) {
      throw new ForbiddenException('You do not have permission to modify this plano');
    }

    return this.planoService.updateById(planoId, updateDto);
  }
}


*/