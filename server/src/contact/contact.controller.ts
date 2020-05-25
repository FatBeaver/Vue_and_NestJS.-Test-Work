import {Controller, Get, Param, Header, Res, Req, UseGuards} from '@nestjs/common';
import { AmoApiWorker } from './contact.service'
import { Response, Request } from 'express'
import { AuthGuard } from './../guards/auth.guard'

@UseGuards(AuthGuard)
@Controller('contact')
export class ContactController {
    constructor(private amo: AmoApiWorker) {}

    @Get('/:query?')
    @Header('Content-Type', 'application/json')
    @Header('Access-Control-Allow-Origin', '*')
    @Header('Access-Control-Allow-Headers', 'origin, content-type, accept')
    async getContacts(@Param() params, @Res() res: Response, @Req() req: Request): Promise<any> {
        const contacts = await this.amo.getContacts(params.query)
        return res.status(200).send(contacts)
    }
}
