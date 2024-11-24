import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import * as os from 'os';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/whoami')
  getWhoAmI(): string {
    const hostname = os.hostname();
    return `You are being served by: ${hostname}`;
  }
}
