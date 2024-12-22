import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.service';
import { AdminService } from './admin.service';
import { Request } from 'express';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usuarioService: UsuarioService,
    private adminService: AdminService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new ForbiddenException('No token found');
    }

    const decoded = this.jwtService.decode(token) as any;
    const email = decoded?.email;

    if (!email) {
      throw new ForbiddenException('No email found in token');
    }

    const user = await this.usuarioService.findByEmail(email);
    if (!user) {
      throw new ForbiddenException('User not found');
    }

    const userId = user._id.toString(); 
    const isAdmin = await this.adminService.isAdmin(userId); // Usa el userId como cadena
    if (!isAdmin) {
      throw new ForbiddenException('You do not have admin privileges');
    }

    return isAdmin;
  }
}
