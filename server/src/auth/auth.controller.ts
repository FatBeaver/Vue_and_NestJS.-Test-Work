import { Controller, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {

    @Get('/registration')
    public registration() {

    }
}
