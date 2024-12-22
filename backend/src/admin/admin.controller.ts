import { Controller, Post, Body, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /*
  @Post('add')
  async addAdmin(@Body('userId') userId: string) {
    return this.adminService.addAdmin(userId);
  }

  @Delete('remove')
  async removeAdmin(@Body('userId') userId: string) {
    return this.adminService.removeAdmin(userId);
  }
  */
}
