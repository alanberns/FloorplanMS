import { IsEnum, IsNotEmpty, IsString, Length, MaxLength, Matches } from 'class-validator';

enum Obra {
  A_CONSTRUIR = 'A CONSTRUIR',
  A_AMPLIAR = 'A AMPLIAR',
  A_REFACCIONAR = 'A REFACCIONAR',
  A_DEMOLER = 'A DEMOLER',
  A_DEMOLER_Y_CONSTRUIR = 'A DEMOLER Y CONSTRUIR',
  A_DOCUMENTAR = 'A DOCUMENTAR'
}

enum Destino {
  Vivienda_unifamiliar = 'Vivienda unifamiliar',
  Vivienda_multifamiliar = 'Vivienda multifamiliar',
  Vivienda_Unifamiliar_Agrupada = 'Vivienda Unifamiliar Agrupada',
  Oficina = 'Oficina',
  Local_comercial = 'Local comercial',
  Industria = 'Industria'
}

export class CreateProyectoDto {
  @IsString()
  @Length(3, 100)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s, .-@:]*$/, { message: 'Valid characters: a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.- @:' })
  nombre: string;

  @IsString()
  @Length(3, 50)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s, .-@:]*$/, { message: 'Valid characters: a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.- @:' })
  expediente: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 255)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s, .-@:]*$/, { message: 'Valid characters: a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.- @:' })
  ubicacion: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 10)
  @Matches(/^1:[1-9]\d*$/, { message: 'Valid format: 1:xxxxx' })
  escala: string;

  @IsNotEmpty()
  @IsEnum(Destino)
  destino: Destino;

  @IsNotEmpty()
  @IsEnum(Obra)
  obra: Obra;

  @MaxLength(255)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s, .-@:]*$/, { message: 'Valid characters: a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.- @:' })
  otrasExigencias?: string;

  @MaxLength(100)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s, .-@:]*$/, { message: 'Valid characters: a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.- @:' })
  antecedentes?: string;

  @MaxLength(255)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s, .-@:]*$/, { message: 'Valid characters: a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.- @:' })
  propietario?: string;

  @MaxLength(155)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s, .-@:]*$/, { message: 'Valid characters: a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.- @:' })
  proyectistas?: string;

  @MaxLength(155)
  @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s, .-@:]*$/, { message: 'Valid characters: a-zA-ZáéíóúÁÉÍÓÚñÑ0-9,.- @:' })
  direccionTecnica?: string;

  @IsNotEmpty()
  @IsString()
  readonly organizacionId: string;
}
