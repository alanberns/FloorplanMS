import { IsEmail, IsNotEmpty, IsString, Length, Matches } from 'class-validator';

export class CreateUsuarioDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    nombre: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    apellido: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    password: string;
}
