import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Proyecto } from './proyecto/schemas/proyecto.schema';
import { Usuario } from './usuario/schemas/usuario.schema';
import { Organizacion } from './organizacion/schemas/organizacion.schema';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const proyectoModel = app.get<Model<Proyecto>>(getModelToken(Proyecto.name));
  const usuarioModel = app.get<Model<Usuario>>(getModelToken(Usuario.name));
  const organizacionModel = app.get<Model<Organizacion>>(getModelToken(Organizacion.name));

  await proyectoModel.deleteMany({});
  console.log('Proyectos eliminados');

  await usuarioModel.deleteMany({});
  console.log('Usuarios eliminados');

  await organizacionModel.deleteMany({});
  console.log('Organizaciones eliminadas');

  await app.close();
}

bootstrap();
