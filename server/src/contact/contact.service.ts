import {Inject, Injectable} from '@nestjs/common'
import request = require('request')
import {Repository} from "typeorm";
import {User} from "../user/user.entity";

@Injectable()
export class AmoApiWorker {
    private USER_HASH: string = '2a7387883d551c04db3c74756fc3296b739d2a4c'
    private USER_LOGIN: string = 'childrenofbodom737@gmail.com'
    private SUBDOMAIN: string = 'megarzord2000'
    private BASE_URL: string = 'https://'+this.SUBDOMAIN+'.amocrm.ru/api/v2/'

    constructor() {}

    public async getContacts(query: string = ''): Promise<any> {
        const queryStr: string = (query != '') ? `query=${encodeURI(query)}&` : ''

        // Запрос за контактами
        const contactsReqResult: string | object = await this.fetchContacts(queryStr)
        // Если не строка, значит объект, информирующий о том что контакты не найденны
        if (typeof contactsReqResult === 'object') {
            return JSON.stringify(contactsReqResult)
        }
        // Если контакты получены, то парсим строку с ними и извлекаем массив
        let contacts: any[] = JSON.parse(contactsReqResult)._embedded.items

        // Массив для ID всех сделок у всех контактов
        let leadsIDs: number[] = []
        // Добавление ID всех сделок всех контактов в массив выше
        for (let i=0; i < contacts.length; i++) {
            if (Object.keys(contacts[i].leads).length != 0) {
                leadsIDs = leadsIDs.concat(contacts[i].leads.id)
            }
        }
        // Если сделок нет, то ответ
        if (leadsIDs.length == 0) {
            return JSON.stringify(contacts)
        }

        // Склеиваем массив с ID сделок в строку для запроса за сделками
        const leadsIDstr: string = leadsIDs.join(',')
        // Запрос за сделками
        const leadsReqResult: string = await this.fetchLeads(leadsIDstr)
        // Парсим резалт в объекты сделок
        let leads: any[] = JSON.parse(leadsReqResult)._embedded.items
        // Массив для ID всех воронок всех сделок
        let pipelineIDs: number[] = []
        // Добавление ID всех воронок всех сделок в массив выше
        for (let i=0; i < leads.length; i++) {
            pipelineIDs = pipelineIDs.concat(leads[i].pipeline.id)
        }
        // Убираем дубликаты ID
        pipelineIDs = Array.from(new Set(pipelineIDs))

        // Запрос за всеми воронками
        const pipelines: any[] = await this.fetchAllPipelines(pipelineIDs)
        // Закрепление данных о воронке за каждой сделкой
        leads.forEach((lead) => {
            lead.pipelineData = {}
            pipelines.forEach((pipeline) => {
                if (typeof pipeline[lead.pipeline_id] != 'undefined') {
                    if (pipeline[lead.pipeline_id].id == lead.pipeline_id) {
                        lead.pipelineData.name = pipeline[lead.pipeline_id].name
                        lead.pipelineData.status = pipeline[lead.pipeline_id].statuses[lead.status_id]
                    }
                }
            })
        })

        // Закрепление сделок за контактами
        contacts.forEach((contact) => {
            contact.leadsList = []
            leads.forEach((lead) => {
                lead.contacts.id.forEach((contactID) => {
                    if (contactID == contact.id) {
                        contact.leadsList.push(lead)
                    }
                })
            })
        })
        return contacts.reverse()
    }

    // Метод получения контактов
    protected fetchContacts(queryStr: string): Promise<any> {
        return new Promise((resolve) => {
            const contact_url: string =
                `${this.BASE_URL}contacts?${queryStr}USER_LOGIN=${this.USER_LOGIN}&USER_HASH=${this.USER_HASH}`

            request.get(contact_url, (err, response, body) => {
                if (err) {
                    resolve(err)
                }
                if (!body) {
                    resolve({message:"Контакты не найдены", issetContacts: false})
                }
                resolve(body)
            })
        })
    }

    // Метод получения сделок
    protected fetchLeads(leadsIDs: string): Promise<any> {
        return new Promise((resolve) => {
            const leads_url: string =
                `${this.BASE_URL}leads?${leadsIDs}&USER_LOGIN=${this.USER_LOGIN}&USER_HASH=${this.USER_HASH}`

            request.get(leads_url, (err, response, body) => {
                if (err) {
                    resolve(err)
                }
                resolve(body)
            })
        })
    }

    // Метод получения воронки
    protected fetchPipeline(pipelineID: number): Promise<any> {
        return new Promise((resolve) => {
            const pipeline_url: string =
                `${this.BASE_URL}pipelines?id=${pipelineID}&USER_LOGIN=${this.USER_LOGIN}&USER_HASH=${this.USER_HASH}`

            request.get(pipeline_url, (err, response, body) => {
                if (err) {
                    resolve(err)
                }
                resolve(body)
            })
        })
    }

    // Метод получения всех воронок
    protected async fetchAllPipelines(IDs: number[]): Promise<any> {
        let pipelines: any[] = []
        for (const id of IDs) {
            const pipeline = await this.fetchPipeline(id)
            pipelines.push(JSON.parse(pipeline)._embedded.items)
        }
        return pipelines
    }
}
