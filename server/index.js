const express = require('express')
const request = require('request')
const utf8 = require('utf8')

const app = express()

// Константы для API запроса
const USER_HASH = '2a7387883d551c04db3c74756fc3296b739d2a4c'
const USER_LOGIN = 'childrenofbodom737@gmail.com'
const SUBDOMAIN = 'megarzord2000'
const BASE_URL = 'https://'+SUBDOMAIN+'.amocrm.ru/api/v2/'


app.get('/api/contacts/:query?', function(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept')
    const queryStr = (req.params['query']) ? utf8.encode(`query=${req.params['query']}`) : ''

    // Запрос за контактами
    request.get(`${BASE_URL}contacts?${queryStr}&USER_LOGIN=${USER_LOGIN}&USER_HASH=${USER_HASH}`, 
    (error, response, body) => {
        if (error) {
            return res.status(500).send({"message": error})
        }
        if (!body) {
            return res.send({"message":"Контакты не найдены", "issetContacts": false})
        }
        // Полученные контакты
        let contacts = JSON.parse(body)._embedded.items
        // ID Сделок
        let leadIDs = [];
        // Добавление ID всех сделок всех контактов в
        // массив выше
        for (let i=0; i < contacts.length; i++) {
            if (Object.keys(contacts[i].leads).length != 0) {
                leadIDs = leadIDs.concat(contacts[i].leads.id)
            }
        }
        // Если сделок нет, то ответ
        if (leadIDs.length == 0) {
            return res.send(contacts)
        }

        // Склеиваем массив c ID в строку для запроса
        const leadsIDstr = leadIDs.join(',')
        // Запрос за сделками
        request.get(`${BASE_URL}leads?${leadsIDstr}&USER_LOGIN=${USER_LOGIN}&USER_HASH=${USER_HASH}`,
        (error, response, body) => {
            if (error) {
                return res.status(500).send({"message": error})
            }
            let leads = JSON.parse(body)._embedded.items
            const pipelineID = leads[0].pipeline.id
            // Запрос за данными воронки
            request.get(`${BASE_URL}pipelines?${pipelineID}
            &USER_LOGIN=${USER_LOGIN}&USER_HASH=${USER_HASH}`,
            (error, response, body) => {
                if (error) {
                    return res.status(500).send({"message": error})
                }
                // Данные воронки (название, статусы)
                let pipeline = {}
                pipeline.statuses = JSON.parse(body)._embedded.items[pipelineID].statuses
                pipeline.name = JSON.parse(body)._embedded.items[pipelineID].name
                // Закрпеление за сделками данных о статусе в воронке
                leads.forEach(function(lead) {
                    for (let statusID in pipeline.statuses) {
                        if (statusID == lead.status_id) {
                            lead.pipelines = pipeline.statuses[statusID]
                        }
                    }
                })
                // Присвоение сделок контактам
                contacts.forEach(function(contact) {
                    contact.contactLeads = []
                    leads.forEach(function(lead) {
                        lead.contacts.id.forEach(function(contactID) {
                            if (contactID == contact.id) {
                                contact.contactLeads.push(lead)
                            }
                        })
                    })
                })            
                // Ответ
                return res.send(contacts.reverse())
            })
        })
    })
})


app.listen(3000, function() {
    console.log('Server run at PORT 3000...')
})