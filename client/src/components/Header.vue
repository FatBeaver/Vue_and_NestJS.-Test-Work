<template>
    <div id="header" v-cloak>
        <header class="bg-light">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="col-lg-3 col-xl-3 col-md-4">
                        <h1><a class="navbar-brand logo"
                               href="#"
                               @click.prevent="getAllContacts"
                        >Список контактов</a>
                        </h1>
                    </div>
                    
                    <div class="collapse navbar-collapse ml-auto col-lg-5 col-xl-4 col-md-5
                        d-flex justify-content-center">
                        <form class="form-inline my-2 my-lg-0">
                            <input class="form-control mr-sm-2" type="search" placeholder="Поиск контактов"
                                   aria-label="Search" v-model="userQuery">
                            <button class="btn my-2 my-sm-0"
                                    :class="[isValidQuery ? 'btn-outline-success' : 'btn-outline-secondary']"
                                    type="submit"
                                    @click.prevent="sendQuery"
                            >Искать</button>
                        </form>
                    </div>
                </nav>
            </div>
        </header>
    </div>
</template>

<script>

export default {
    name: 'Header',
    data: () => ({
        userQuery: ''
    }),
    computed: {
        isValidQuery() {
            return (this.userQuery.length > 3)
        },
    },
    methods: {
        getAllContacts() {
            this.$store.loading = true
            this.$store.dispatch('fetchContacts')
        },
        sendQuery() {
            if (!this.isValidQuery) {
                return false
            }
            this.$store.dispatch('fetchContacts', this.userQuery)
        }
    }
}
</script>