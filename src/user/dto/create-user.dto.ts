/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Matches, MinLength } from "class-validator";

const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Usuario debe tener al menos 2 caracteres.' })
    //@IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @Matches(passwordRegEx, {
    message: `La contraseña debe de contener minimo 8 y maximo 20 caracteres, 
    al menos una letra mayuscula, 
    una letra minuscula, 
    un numero y 
    un caracter especial`,
    })
    password: string;

    @IsString()
    @MinLength(2, { message: 'Nombre debe tener al menos 2 caracteres.' })
    @IsNotEmpty()
    name: string;

    @IsString()
    @MinLength(2, { message: 'Apellido Paterno debe tener al menos 2 caracteres.' })
    @IsNotEmpty()
    middle_name: string;

    @IsString()
    @MinLength(2, { message: 'Apellido Materno debe tener al menos 2 caracteres.' })
    last_name: string;
    
}
