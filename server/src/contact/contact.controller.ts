import {Controller, Get, Param, Header, Res} from '@nestjs/common';
import { AmoApiWorker } from './contact.service'
import { Response } from 'express'

@Controller('contact')
export class ContactController {
    constructor(private amo: AmoApiWorker) {}

    @Get('/:query?')
    @Header('Content-Type', 'application/json')
    @Header('Access-Control-Allow-Origin', '*')
    @Header('Access-Control-Allow-Headers', 'origin, content-type, accept')
    async getContacts(@Param() params, @Res() res: Response): Promise<any> {
        const contacts = await this.amo.getContacts(params.query)
        return res.status(200).send(contacts)
    }
}
