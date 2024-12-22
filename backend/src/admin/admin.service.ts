import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async addAdmin(userId: string): Promise<Admin> {
    const newAdmin = new this.adminModel({ userId });
    return newAdmin.save();
  }

  async removeAdmin(userId: string): Promise<void> {
    await this.adminModel.deleteOne({ userId });
  }

  async isAdmin(userId: string): Promise<boolean> {
    const admin = await this.adminModel.findOne({ userId });
    return !!admin;
  }
}
