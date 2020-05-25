import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import crypto = require("crypto");


@Injectable()
export class AuthGuard implements CanActivate {
    private secretKey = '-_-jajusjawasdew123123ikas-_-dxzwe1321lsdawdsawd123-_-'

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        if (typeof request.headers.authorization === 'undefined') {
            return false
        }
        return this.JWTvalidate(request.headers.authorization)
    }

    public JWTvalidate(jwt): boolean {
        const tokenChunks: string[] = jwt.split('.')
        // Части токена
        const header: string = tokenChunks[0]
        const body: string = tokenChunks[1]
        const signature: string = tokenChunks[2]
        // Проверка подпси
        const newSignature = crypto.createHmac('SHA256', this.secretKey)
            .update(`${header}.${body}`).digest('base64')

        return (newSignature === signature) ? true : false
    }
}