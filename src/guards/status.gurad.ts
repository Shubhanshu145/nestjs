import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/Schema/user.schema';


@Injectable()
export class StatusGuard implements CanActivate {
  constructor(private jwtService: JwtService, @InjectModel(User.name) private userModel: Model<User>) {}
  l
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('Invalid Token');
    }
    try {
      const payload = await this.jwtService.verify(token, {
        secret: '123',
      });
      const userId = payload.userId; 
      const user = await this.userModel.findById(userId).select('-password').exec();
      console.log('Payload:', payload); 
      console.log('User ID:', userId); 
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      request['user'] = user; 
      if(user.role === 'super-admin'){
        // request['user'] = user;
        return true
      }
      
      
      
    } catch (e) {
      Logger.error(e.message);
      throw new UnauthorizedException('Invalid Token');
    }
    return false;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}