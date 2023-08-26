import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    )
  {

  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>
  {

    const request = context.switchToHttp().getRequest();
    const {authorization} = request.headers;
    
    if(!authorization || !authorization.toLowerCase().includes('bearer '))
    {
      return false;
    }

    const token = authorization.split(' ')[1] ?? '';
    
    try {
      const data = this.authService.checkToken(token);
      
      request.token = data;
      request.user = await this.usersService.findOne(data.uuid);
      
  
    } catch (error) {
      
      return false;
      
    }

    return true;
    
     

  }

}
