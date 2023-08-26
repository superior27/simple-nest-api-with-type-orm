import { Contains, IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from "class-validator";
import { Role } from "src/enums/role.enum";

export class CreateUserDto {


    @IsString()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @IsEmail()
    @MaxLength(100)
    email: string;

    @IsStrongPassword({
        minLength: 6, 
        minNumbers: 0,
        minLowercase: 0,
        minSymbols: 0,
        minUppercase: 0       
    })
    password: string;


    @IsEnum(Role)
    @IsOptional()
    role: number;

    


}
