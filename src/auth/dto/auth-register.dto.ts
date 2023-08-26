import { IsEmail, IsStrongPassword } from "class-validator";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class AuthRegisterDto extends CreateUserDto{

}