import { IsEmail, IsNotEmpty, IsString, Length, IsBoolean } from 'class-validator';

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

    @IsBoolean()
    isActive: boolean;

    //@IsString()
    organizacionId: string;
}
