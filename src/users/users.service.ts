import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private user: Repository<User>
  ){}

  async create(createUserDto: CreateUserDto) : Promise<User> 
  {
    const hasEmail = await this.user.exist({
      where: {
        email: createUserDto.email
      }
    });

    if(hasEmail)
    {
      throw new BadRequestException('This e-mail has already been registered!');
    }

    const user = this.user.create(createUserDto);
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);
    
    return await this.user.save(user);
  }

  async findAll(page:number = 1) : Promise <User[]|null> 
  {

    return await this.user.find({
      take : 10,
      skip : 10 * (page-1)
    });

  }

  async findOne(uuid: string) : Promise <User|null>
  {
    return await this.user.findOne({
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
      await this.user.update({uuid: uuid}, updateUserDto);
      
    } catch (error) {
      user = null;
      console.log(error);
      
    }
    
    return await this.findOne(uuid);
    
    
  }

  async remove(uuid: string) : Promise<boolean> 
  {
    let result: boolean;
    
    try 
    {
      await this.user.delete({uuid: uuid});

      result = true;
      
    } 
    catch (error) 
    {
      result = false;
    }

    return result;
  }
}
