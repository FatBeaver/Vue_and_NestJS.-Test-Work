<template>
    <div class="leads-contact-info">
        <div class="row">
            <div class="col-lg-1 col-xl-1 col-md-1"></div>
            <div class="col-lg-1 col-xl-1 col-md-1 lead-info-item lead-name"><span>{{lead.name}}</span></div>
            <div class="col-lg-2 col-xl-2 col-md-2 lead-info-item" style="margin-right:7px;"><span>Воронка:</span>
                {{lead.pipelineData.name}}
            </div>
            <div class="col-lg-2 col-xl-2 col-md-2 lead-info-item" style="margin-right:7px;"><span>Статус:</span>
                {{lead.pipelineData.status.name}}
            </div>
            <div class="col-lg-2 col-xl-2 col-md-2 lead-info-item"><span>Компания:</span> {{(Object.keys(lead.company).length > 0)
                ? lead.company.name : 'Отсутствует'}}</div>
            <div class="col-lg-2 col-xl-2 col-md-2 lead-info-item"><span>Бюджет:</span> {{ getPrice }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'lead',
    props: ['lead'],
    filters: {
        sliceText(text, start=0, end=1) {
            return text.substr(start, end)
        }
    },
    computed: {
        getPrice() {
            return this.lead.sale ? this.lead.sale + ' ₽' : 'Не указан'
        }
    }
}
</script>