// Заголовок
let header = new Vue({
    el: '#header',
    data: {
        userQuery: '',
    },
    computed: {
        isValidQuery() {
            return (this.userQuery.length > 3) ? true : false
        },
    },
    methods: {
        getAllContacts() {
            table.loading = true
            axios.get(`http://localhost:3000/api/contacts`)
            .then(response => {
                console.log(response)
                if (response.data.issetContacts === false) {
                    table.loading = false
                    return table.contacts = []
                }
                table.contacts = response.data
                table.loading = false
            })
        },
        sendQuery() {
            if (!this.isValidQuery) {
                return false
            }
            table.loading = true
            axios.get(`http://localhost:3000/api/contacts/${this.userQuery}`)
            .then(response => {
                console.log(response)
                if (response.data.issetContacts === false) {
                    table.loading = false
                    return table.contacts = []
                }
                table.contacts = response.data
                table.loading = false
            })
        }
    }
})


// Таблица
let table = new Vue({
    el: '#table',
    data: {
        loading: false,
        contacts: []
    },
    computed: {
        issetContacts() {
            return (this.contacts.length > 0) ? true : false
        }
    },
    methods: {

    },
    mounted() {
        this.loading = true
        axios.get(`http://localhost:3000/api/contacts`)
        .then(response => {
            console.log(response)
            if (response.data.issetContacts === false) {
                table.loading = false
                table.contacts = []
            }
            table.contacts = response.data
            this.loading = false
        })
    }
})


// Контакт в таблице
Vue.component('contact', {
    data() {    
        return {
            hiddenAddedData: true,
        }
    },
    methods: {
        contactData() {
            let contactFields = {}
            this.contact.custom_fields.forEach((field) => {
                contactFields[field.code] = (field.values[0].value)
            })
            return contactFields
        },
        toggleLeadsInfo() {
            this.hiddenAddedData = !this.hiddenAddedData
        }
    },
    props: ['contact'],
    template: `<div class="contact-body-item">
        <div class="main-contact-info">
            <div class="row">
                <div class="col-lg-1 d-flex justify-content-center">
                    <div class="plus-container" @click="toggleLeadsInfo">
                        <i class="fas fa-plus" :class="[hiddenAddedData ? '' : 'rotate_135deg']"></i>
                    </div>
                </div>
                <div class="col-lg-3">{{ contact.name || 'Не указано'}}</div>
                <div class="col-lg-3">{{ this.contactData().POSITION || 'Не указана' }}</div>
                <div class="col-lg-3">{{ this.contactData().PHONE || 'Не указан'}}</div>
                <div class="col-lg-2">{{ this.contactData().EMAIL || 'Не указан'}}</div>
            </div>
        </div>
        <div v-show="!hiddenAddedData">
            <lead
                v-for="lead in contact.contactLeads"
                :key="lead.id"
                :lead="lead"
            ></lead>
        </div>
    </div>`
})

// Данные о сделке
Vue.component('lead', {
    props: ['lead'],
    filters: {
        sliceText(text, start=0, end=1) {
            return text.substr(start, end)
        }
    },
    template: `
    <div class="leads-contact-info">
        <div class="row">
            <div class="col-lg-1"></div>
            <div class="col-lg-1 lead-info-item lead-name"><span>{{lead.name}}</span></div>
            <div class="col-lg-2 lead-info-item" style="margin-right:7px;"><span>Воронка:</span>
                {{lead.pipelines.name}}
            </div>
            <div class="col-lg-2 lead-info-item"><span>Компания:</span> {{(Object.keys(lead.company).length > 0) 
            ? lead.company.name : 'Отсутствует'}}</div>
            <div class="col-lg-2 lead-info-item"><span>Бюджет:</span> {{lead.sale || 'Не указан'}}</div>
        </div>
    </div>
    `
})

// Анимация загрузки
Vue.component('loader', {
    template: `
    <div class="spinner-border text-success" role="status" style="width:5rem; height:5rem;">
        <span class="sr-only">Загрузка данных...</span>
    </div>`
})
