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


/*
USUARIOS
{
  "nombre": "nombre1",
  "apellido": "apellido1",
  "email": "usuario1@test.com",
  "password": "12345"
}
{
  "nombre": "nombre2",
  "apellido": "apellido2",
  "email": "usuario2@test.com",
  "password": "12345"
}

PROYECTOS
  {
    "nombre": "proyecto1", 
    "ubicacion": "ubicacion proyecto 2",
    "destino": "A CONSTRUIR",
    "obra": "Local comercial",
    "organizacionId": ""
  }
  {
    "nombre": "proyecto2", 
    "ubicacion": "ubicacion proyecto 2",
    "destino": "A REFACCIONAR",
    "obra": "Vivienda unifamiliar",
    "organizacionId": ""
  }

  ORGANIZACIONES
  {
    "nombre": "organizacion1",
    "direccion": "dir org 1",
    "contacto": "contacto tel 1234456"
  }
  {
    "nombre": "organizacion2",
    "direccion": "dir org 2",
    "contacto": "contacto tel 1234456"
  }
*/
