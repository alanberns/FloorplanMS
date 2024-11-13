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
    @IsEmail({}, { message: "email must be valid" })
    email: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 100)
    password: string;

    @IsNotEmpty()
    @IsString()
    readonly organizacionId: string;
}
