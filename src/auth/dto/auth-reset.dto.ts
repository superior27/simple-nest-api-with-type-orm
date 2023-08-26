import { IsJWT, IsStrongPassword } from "class-validator";

export class AuthResetDto {
    
    @IsStrongPassword({
        minLength: 6, 
        minNumbers: 0,
        minLowercase: 0,
        minSymbols: 0,
        minUppercase: 0       
    })
    password: string;


    @IsJWT()
    token: string;

}