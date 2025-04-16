import { IsEmail, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class loginDto{
    
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(10)
    phone:string;
    @IsString()
    password:string;

    

}