import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Schema/user.schema';
import * as bcrypt from 'bcrypt';
@Injectable()
export class SuperAdminService {
    constructor(@InjectModel(User.name) private UserModel:Model<User>){}
    async createSuperAdmin(){
        const superadmin = await this.UserModel.findOne({
            role:'super-admin'
        });
        if(!superadmin){
            const superadminemail = 'strvedi.lps@gmail.com';
            const superadminpassword = '12345678'
            const superadminphone = '7897021779'

            const hashedPassword = await bcrypt.hash(superadminpassword,10);
            const createnew = await this.UserModel.create({
                name:"Shubhanshu",
                email:superadminemail,
                phone:superadminphone,
                password:hashedPassword,
                role: "super-admin"
        })
        console.log("super-admin created")
        }
        else{
            console.log("super-admin already existed");
        }

    }
}
