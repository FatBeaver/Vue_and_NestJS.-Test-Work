<template>
    <div id="table" v-cloak>
        <section>
            <div class="container-fluid">
                <div class="contacts-table">
                    <div class="contacts-table__header">
                        <div class="row">
                            <div class="col-lg-1 col-xl-1 col-md-1"></div>
                            <div class="col-lg-3 col-xl-3 col-md-3">Полное имя</div>
                            <div class="col-lg-3 col-xl-3 col-md-3">Должность</div>
                            <div class="col-lg-3 col-xl-3 col-md-3">Телефон</div>
                            <div class="col-lg-2 col-xl-2 col-md-2">Email</div>
                        </div>
                    </div>
                    
                    <div v-if="isLoading"
                         style="margin-top:50px; padding-bottom:50px;"
                         class="d-flex justify-content-center aling-items-center">
                         <Loader />
                    </div>
                    
                    <div v-else>
                        <div v-if="!issetContacts" class="not-contacts">
                            <h1>Контакты не найдены...</h1>
                        </div>
                        
                        <div v-else class="contacts-table__body">
                            <Contact
                                v-for="contact in allContacts"
                                :key="contact.id"
                                :contact="contact"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Contact from '@/components/Contact'

export default {
    computed: {
        issetContacts() {
            return (this.allContacts.length > 0)
        },
        allContacts() {
            return this.$store.getters.allContacts
        },
        isLoading() {
            return this.$store.getters.loading
        }
    },
    methods: {},
    mounted() {
        this.$store.dispatch('fetchContacts')
    },
    components: {
        Contact
    }
}
</script>