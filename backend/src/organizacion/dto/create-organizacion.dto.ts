import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateOrganizacionDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 100)
  nombre: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 300)
  direccion: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 300)
  contacto: string;

  @IsNotEmpty()
  @IsString()
  letra: string; 
  
  @IsNotEmpty()
  @IsNumber()
  numero: number;
}
