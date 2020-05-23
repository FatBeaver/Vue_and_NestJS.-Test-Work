<template>
    <div class="contact-body-item">
        <div class="main-contact-info">
            <div class="row">
                <div class="col-lg-1 d-flex justify-content-center">
                    <div class="plus-container" @click="toggleLeadsInfo">
                        <i class="fas fa-plus" :class="[hiddenAddedData ? '' : 'rotate_135deg']"></i>
                    </div>
                </div>
                <div class="col-lg-3 col-xl-3 col-md-3">{{ contact.name || 'Не указано'}}</div>
                <div class="col-lg-3 col-xl-3 col-md-3">{{ this.contactData().POSITION || 'Не указана' }}</div>
                <div class="col-lg-3 col-xl-3 col-md-3">{{ this.contactData().PHONE || 'Не указан'}}</div>
                <div class="col-lg-2 col-xl-2 col-md-2">{{ this.contactData().EMAIL || 'Не указан'}}</div>
            </div>
        </div>
        <div v-show="!hiddenAddedData">
            <lead
                v-for="lead in contact.leadsList"
                :key="lead.id"
                :lead="lead"
            ></lead>
        </div>
    </div>
</template>

<script>
import Lead from '@/components/Lead'

export default {
    data: () => ({
        hiddenAddedData: true,
    }),
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
    components: {
        Lead
    }
}
</script>