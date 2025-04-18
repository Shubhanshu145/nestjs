import {Schema  , Prop , SchemaFactory} from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User extends Document{
    @Prop({required:true})
    name :string

    @Prop({required:true , unique:true})
    email :string

    @Prop({required:true , unique:true})
    phone :string

    @Prop({required:true})
    password:string

    @Prop({required:false})
    role: string

    
}
export const UserSchema = SchemaFactory.createForClass(User);