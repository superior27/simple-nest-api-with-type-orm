import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { AuthGuard } from 'src/guards/auth.guard';


@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post()
  async create(@Body() createUserDto: CreateUserDto) 
  {
    return await this.usersService.create(createUserDto);
  }


  @Get()
  async findAll(@Query('page') page:number=1) : Promise<User[]|null>
  {
    page = (isNaN(+page)) ? 1 : Math.trunc(page);
    return await this.usersService.findAll(page);
  }

  @Roles(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }


  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) : Promise<User|null>  
  {
    return await this.usersService.update(id, updateUserDto);
  }

 
  @Delete(':id')
  async remove(@Res() response, @Param('id') id: string)  : Promise<Response>
  {
    const result = await this.usersService.remove(id);

    const message = (result) 
      ? [`User ${id} removed!`, HttpStatus.OK] 
      : [`User ${id} not found!`, HttpStatus.NOT_FOUND];
    
    
    return response.status(message[1]).json(message[0]);
  }


}
