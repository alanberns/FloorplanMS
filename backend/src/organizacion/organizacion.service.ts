import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Organizacion } from './schemas/organizacion.schema';
import { Usuario } from '../usuario/schemas/usuario.schema';
import { CreateOrganizacionDto } from './dto/create-organizacion.dto';
import { UpdateOrganizacionDto } from './dto/update-organizacion.dto';

@Injectable()
export class OrganizacionService {
  constructor(
    @InjectModel(Organizacion.name) private organizacionModel: Model<Organizacion>,
    @InjectModel(Usuario.name) private usuarioModel: Model<Usuario>,
  ) {}

  async create(createOrganizacionDto: CreateOrganizacionDto): Promise<Organizacion> {
    const createdOrganizacion = new this.organizacionModel(createOrganizacionDto);
    return createdOrganizacion.save();
  }

  async findAll(): Promise<Organizacion[]> {
    return this.organizacionModel.find().exec();
  }

  async findOne(id: string): Promise<Organizacion> {
    return this.organizacionModel.findById(id).exec();
  }

  async update(id: string, updateOrganizacionDto: UpdateOrganizacionDto): Promise<Organizacion> {
    return this.organizacionModel.findByIdAndUpdate(id, updateOrganizacionDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Organizacion> {
    return this.organizacionModel.findOneAndDelete({_id: id }).exec();
  }

  async addUsuario(id: string, usuarioId: string): Promise<Organizacion> {
    return this.organizacionModel.findByIdAndUpdate(
      id,
      { $push: { usuarios: usuarioId } },
      { new: true, useFindAndModify: false }
    ).exec();
  }

  async addProyecto(id: string, proyectoId: string): Promise<Organizacion> {
    return this.organizacionModel.findByIdAndUpdate(
      id,
      { $push: { proyectos: proyectoId } },
      { new: true, useFindAndModify: false }
    ).exec();
  }

  async findUsuariosByOrganizacion(orgId: string): Promise<Usuario[]> { 
    const organizacion = await this.organizacionModel.findById(orgId).populate('usuarios').lean().exec(); 
    if (organizacion && organizacion.usuarios) { 
      return organizacion.usuarios as unknown as Usuario[]; 
    } 
    return []; 
  }

  async removeUsuarioFromOrganizacion(orgId: string, usuarioId: string): Promise<Organizacion> { 
    return this.organizacionModel.findByIdAndUpdate( orgId, { $pull: { usuarios: usuarioId } }, { new: true } ).exec();
  }
  
  async findUsuariosNoAsignados(orgId: string): Promise<Usuario[]> {
    const organizacion = await this.organizacionModel.findById(orgId).select('usuarios').lean().exec();
    console.log("Organización:", organizacion);
    const usuariosOrg = organizacion?.usuarios || [];
    console.log("IDs de Usuarios en la Organización:", usuariosOrg);
    
    const query = {
      _id: { $nin: usuariosOrg },
      isActive: true,
    };
  
    return this.usuarioModel.find(query).exec();
  }
  
}
