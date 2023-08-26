import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {


  async create(createUserDto: CreateUserDto) : Promise<User> 
  {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    return await this.prisma.user.create({
      data: createUserDto
    });
  }

  async findAll(page:number = 1) : Promise <User[]|null> 
  {
    return await this.prisma.user.findMany({
      take : 10,
      skip : 10 * (page-1)
    });

  }

  async findOne(uuid: string) : Promise <User|null>
  {
    return await this.prisma.user.findUnique({
      where: {
        uuid
      }
    });
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) : Promise <User|null> 
  {
    let user:User|null;
    if(updateUserDto.password)
    {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    
    
    try {
      user = await this.prisma.user.update({
        data: {
          name: updateUserDto.name,
          email: updateUserDto.email,
          password: updateUserDto.password,
          role: updateUserDto.role,
          updated_at: (new Date())
        },
        where: {
          uuid
        }

      });
      
    } catch (error) {
      user = null;
      console.log(error);
      
    }
    return user;
    
    
  }

  async remove(uuid: string) : Promise<boolean> 
  {
    let result: boolean;
    
    try 
    {
      await this.prisma.user.delete({
        where:{
          uuid
        }
      });

      result = true;
      
    } 
    catch (error) 
    {
      result = false;
    }

    return result;
  }
}
