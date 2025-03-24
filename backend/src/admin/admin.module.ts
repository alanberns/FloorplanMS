import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from './schemas/admin.schema';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminAuthGuard } from './admin-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Admin.name, schema: AdminSchema }]),
  forwardRef(() =>UsuarioModule),
  JwtModule.register({
    secret: '7e3K3jKxoghSTlYFnnPeigOLfzGWmfFeztaKX-AhLPbWy-EF2LCIy8JBaI46yqIm',
    signOptions: { 
      expiresIn: '60m' 
    },
   }),],
  providers: [AdminService, AdminAuthGuard],
  controllers: [AdminController],
  exports: [AdminService, AdminAuthGuard],
})
export class AdminModule {}
