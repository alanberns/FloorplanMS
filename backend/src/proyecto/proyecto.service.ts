import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { Proyecto } from './schemas/proyecto.schema';

@Injectable()
export class ProyectoService {
  constructor(
    @InjectModel(Proyecto.name) private proyectoModel: Model<Proyecto>,
  ) {}

  async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
    const createdProyecto = new this.proyectoModel(createProyectoDto);
    return createdProyecto.save();
  }

  async findAll(): Promise<Proyecto[]> {
    return this.proyectoModel.find().exec();
  }

  async findOne(id: string): Promise<Proyecto> {
    return this.proyectoModel.findById(id).exec();
  }

  async update(id: string, updateProyectoDto: UpdateProyectoDto): Promise<Proyecto> {
    return this.proyectoModel.findByIdAndUpdate(id, updateProyectoDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Proyecto> {
    return this.proyectoModel.findOneAndDelete({_id: id }).exec();
  }

  async addPlano(id: string, planoId: string): Promise<Proyecto> {
    return this.proyectoModel.findByIdAndUpdate(
      id,
      { $push: { planos: planoId } },
      { new: true, useFindAndModify: false }
    ).exec();
  }
  
}
