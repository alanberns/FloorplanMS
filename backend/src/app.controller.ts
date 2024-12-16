import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get('auth')
  Auth() {
    return { message: 'Protected data'};
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/* app.controller.ts PARA USAR EL TOKEN JWT
import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('api')
export class AppController {
  @UseGuards(JwtAuthGuard)
  @Get('data')
  getData() {
    return { message: 'This is protected data' };
  }
}
*/