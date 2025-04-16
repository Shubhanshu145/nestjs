import { BadRequestException, Body, Controller, Get, Post, UseGuards , Request, Delete, Param, Put} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { signupDto } from 'src/DTO/signup.dto';
import { User } from 'src/Schema/user.schema';
import { UserService } from './user.service';
import { loginDto } from 'src/DTO/login.dto';
import { createDto } from 'src/DTO/create.dto';
import { StatusGuard } from 'src/guards/status.gurad';
import { Roles } from 'src/roles/role.enum';
import { Role } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guards';


@Controller('user')
export class UserController {
    constructor(@InjectModel(User.name) private Usermodel:Model<User>,
private readonly UserService:UserService){}

    @Post('signup')
    async signup(@Body() signupData:signupDto){
        return this.UserService.signup(signupData);

    }
    @Post('login')
    async login(@Body() loginData:loginDto){
        return this.UserService.login(loginData);
    }
  @Get('profile')
  @Role(Roles.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(StatusGuard)
  getProfile(@Request() req){
    const user = req['user']; 
    return user;
  }
  @Post('create-admin')
  @UseGuards(StatusGuard)
  async create(@Body() createData:createDto){
    return this.UserService.create(createData);
  }
  @Delete(':id')
  @UseGuards(StatusGuard)
  async deleteAdmin(@Param('id') id:string){
    return this.UserService.delete(id);
  }

  @Put(':id')
  @UseGuards(StatusGuard)
  async update(@Param('id') id:string,@Body() updatedData : any){
    return this.UserService.update(id,updatedData)
  }

  @Get('getUserProfile')
  @UseGuards(StatusGuard)
  getUserProfile(@Request() req){
    const user = req['user']
    return user;
  }
}
