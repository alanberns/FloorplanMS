import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';
import { Plano } from './schemas/plano.schema';

@Injectable()
export class PlanoService {
  constructor(
    @InjectModel(Plano.name) private planoModel: Model<Plano>,
  ) {}

  async create(createPlanoDto: CreatePlanoDto): Promise<Plano> {
    const createdPlano = new this.planoModel(createPlanoDto);
    return createdPlano.save();
  }

  async findAll(): Promise<Plano[]> {
    return this.planoModel.find().exec();
  }

  async findOne(id: string): Promise<Plano> {
    return this.planoModel.findById(id).exec();
  }

  async update(id: string, updatePlanoDto: UpdatePlanoDto): Promise<Plano> {
    return this.planoModel.findByIdAndUpdate(id, updatePlanoDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Plano> {
    return this.planoModel.findOneAndDelete({ _id: id }).exec();
  }
}
