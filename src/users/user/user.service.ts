import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { signupDto } from 'src/DTO/signup.dto';
import { User } from 'src/Schema/user.schema';
import * as bcrypt from 'bcrypt';
import { loginDto } from 'src/DTO/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private Usermodel:Model<User>,private jwtService : JwtService,){}
    async signup(signupData:signupDto){
        const {name,email,phone,password,role} = signupData;
        const emailInUse = await this.Usermodel.findOne({
            email:signupData.email
        })
        if(emailInUse){
            throw new BadRequestException("User already exists");
        }
        const phoneInUse = await this.Usermodel.findOne({
            phone:signupData.phone
        })
        if(phoneInUse){
            throw new BadRequestException("Number already in use")
        }
        const hashedPassword  = await bcrypt.hash(password,10);
         await this.Usermodel.create({
            name,
            email,
            phone,
            password:hashedPassword,
            role
         });
    }

    
    async login(loginData:loginDto){
        const {email,phone,password}=loginData;
        const user = await this.Usermodel.findOne({email});
        if(!user){
            throw new BadRequestException("Invalid credentials")
        }
        const phoneInUse = await this.Usermodel.findOne({phone});
        if(!phoneInUse){
            throw new BadRequestException("Invalid credentials")
        }
        const matchedpassword = await bcrypt.compare(password,user.password)
        if(!matchedpassword){
            throw new BadRequestException("Invalid credentials")
          }
          const tokens = await this.generateUserToken(user._id);
          return{
            tokens
          }
    }
    async generateUserToken(userId){
        const accessToken = this.jwtService.sign({userId},{expiresIn:'1h'});
        return{
          accessToken
        };
      }


    async create(signupData:signupDto){
        const {name,email,phone,password,role} = signupData;
        const emailInUse = await this.Usermodel.findOne({
            email:signupData.email
        })
        if(emailInUse){
            throw new BadRequestException("User already exists");
        }
        const phoneInUse = await this.Usermodel.findOne({
            phone:signupData.phone
        })
        if(phoneInUse){
            throw new BadRequestException("Number already in use")
        }
        const hashedPassword  = await bcrypt.hash(password,10);
         await this.Usermodel.create({
            name,
            email,
            phone,
            password:hashedPassword,
            role
         });

        
    }
    async delete(id:string){
        const deleteuser = await this.Usermodel.findOneAndDelete({_id:id});
        if(!deleteuser){
            throw new BadRequestException("User not found")
        }
        console.log("User Deleted SuccessFully");
    }

    async update(id:string,updatedData:Partial<User>){
        const updateuser = await this.Usermodel.findOneAndUpdate({_id:id},updatedData)
        if(!updateuser){
            throw new BadRequestException("Not updated")
        }
        console.log("User updated");
    }
    
}
