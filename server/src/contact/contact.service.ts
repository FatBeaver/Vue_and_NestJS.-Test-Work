import { Injectable } from '@nestjs/common';
import request = require('request');


@Injectable()
export class AmoApiWorker {
    private USER_HASH: string = '2a7387883d551c04db3c74756fc3296b739d2a4c'
    private USER_LOGIN: string = 'childrenofbodom737@gmail.com'
    private SUBDOMAIN: string = 'megarzord2000'
    private BASE_URL: string = 'https://'+this.SUBDOMAIN+'.amocrm.ru/api/v2/'

    public async get(query: string): Promise<any> {
        const queryStr = query ? `query=${query}` : ''
        let contacts = await this.fetchContacts(queryStr)

    }

    private fetchContacts(queryStr: string): Promise<any> {
        return new Promise((resolve) => {
            const contact_url = `${this.BASE_URL}contacts?${queryStr}&USER_LOGIN=${this.USER_LOGIN}
            &USER_HASH=${this.USER_HASH}`
            request.get(contact_url, (err, response, body) => {
                if (err) {
                    resolve(err)
                }
                if (!body) {
                    resolve({"message":"Контакты не найдены", "issetContacts": false})
                }
                resolve(JSON.parse(body)._embedded.items);
            })
        })
    }
}
