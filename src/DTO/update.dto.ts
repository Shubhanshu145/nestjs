import { IsEmail, IsNumber, IsString, Matches, MinLength } from "class-validator";

export class signupDto{
    @IsString()
    name:string;
    @IsEmail()
    email:string;
    @IsString()
    @MinLength(10)
    phone:string;
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/,{message:"Password must contains one digit"})
    password:string;

    @IsString()
    role: string;

}