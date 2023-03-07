import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { Role, ROLES_KEY } from '..';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles || requiredRoles.length === 0) {
            return true;
        }
        const { user } = context.switchToHttp().getRequest();
        return requiredRoles.some(role => {
            return user.roles?.includes(role);
        });
    }
}
