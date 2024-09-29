import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

enum Destino {
  A_CONSTRUIR = 'A CONSTRUIR',
  A_AMPLIAR = 'A AMPLIAR',
  A_REFACCIONAR = 'A REFACCIONAR',
  A_DEMOLER = 'A DEMOLER',
  A_DEMOLER_Y_CONSTRUIR = 'A DEMOLER Y CONSTRUIR',
  A_DOCUMENTAR = 'A DOCUMENTAR'
}

enum Obra {
  Vivienda_unifamiliar = 'Vivienda unifamiliar',
  Vivienda_multifamiliar = 'Vivienda multifamiliar',
  Vivienda_Unifamiliar_Agrupada = 'Vivienda Unifamiliar Agrupada',
  Oficina = 'Oficina',
  Local_comercial = 'Local comercial',
  Industria = 'Industria'
}

export class CreateProyectoDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @Length(3)
  ubicacion: string;

  @IsNotEmpty()
  @IsEnum(Destino)
  destino: Destino;

  @IsNotEmpty()
  @IsEnum(Obra)
  obra: Obra;

  @IsString()
  readonly organizacionId: string;
}
