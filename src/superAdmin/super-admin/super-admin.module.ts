import { Module, OnModuleInit } from '@nestjs/common';
import { SuperAdminService } from './super-admin.service';
import { User, UserSchema } from 'src/Schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[MongooseModule.forFeature([{
    name :User.name,
    schema: UserSchema 
   } ])],
  providers: [SuperAdminService]
})
export class SuperAdminModule implements OnModuleInit{
  constructor(private readonly superadminService:SuperAdminService){}
  async onModuleInit() {
    return this.superadminService.createSuperAdmin();
  }
}
