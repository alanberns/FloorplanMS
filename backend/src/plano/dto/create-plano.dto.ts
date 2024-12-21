import { IsEnum, IsNotEmpty, IsString, Length, IsOptional, IsArray } from 'class-validator';

enum Especialidad {
  Arquitectura = 'Arquitectura',
  Estructura =  'Estructura',
  Instalaciones_electricas = 'Instalaciones eléctricas',
  Instalacion_sanitaria = 'Instalación sanitaria',
  Otros = 'Otros'
}

export class CreatePlanoDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  nombre: string;

  @IsNotEmpty()
  @IsEnum(Especialidad)
  especialidad: Especialidad;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  etiquetas?: string[];

  archivo: Buffer;

  nombreArchivo: string;

  @IsNotEmpty()
  @IsString()
  proyectoId: string;
}
