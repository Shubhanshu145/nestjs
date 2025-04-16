import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Roles } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<Roles[]>('roles',context.getHandler());
        if(!roles){
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        return roles.some(role=>user.roles.includes(role));
    }
}