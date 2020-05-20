import { Controller, Get, Param } from '@nestjs/common';
import { AmoApiWorker } from './contact.service'

@Controller('contact')
export class ContactController {
    constructor(private amo: AmoApiWorker) {}

    @Get('/all')
    getAll(): string {
        return 'all users'
    }

    @Get('/:query?')
    async getContacts(@Param() params): Promise<any> {
         return await this.amo.get(params.query)
    }

}
