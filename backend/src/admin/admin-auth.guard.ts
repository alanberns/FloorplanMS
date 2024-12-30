import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsuarioService } from '../usuario/usuario.service';
import { AdminService } from './admin.service';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';


@Injectable()
export class AdminAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private usuarioService: UsuarioService,
    private adminService: AdminService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> { 
    try{
      const result = await super.canActivate(context); 
      if (!result) { 
        return false; 
      } 
      const request = context.switchToHttp().getRequest<Request & { user?: any }>(); 
      let user = request.user; 

      if (!user || !user.email) { 
        throw new ForbiddenException('No email found in token');
      }
      user = await this.usuarioService.findByEmail(user.email);
      if (!user) {
        throw new ForbiddenException('User not found');
      }
      
      const userId = user._id.toString(); 
      const isAdmin = await this.adminService.isAdmin(userId); // Usa el userId como cadena
      if (!isAdmin) {
        throw new ForbiddenException('You do not have admin privileges');
      }
    
      return isAdmin;
    } catch (e){
      console.log(e)
    }
  }
}   
