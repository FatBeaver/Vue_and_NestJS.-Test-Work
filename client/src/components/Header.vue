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
                    
                    <div class="collapse navbar-collapse ml-auto col-lg-4 col-xl-4 col-md-5
                        d-flex justify-content-end">
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
                    
                    <div
                        class="col-lg-1 col-xl-1 d-flex justify-content-end"
                    >
                        <button type="button"
                            class="btn btn-outline-primary"
                            @click="logout"
                        >
                            Выйти
                        </button>
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
        logout() {
            sessionStorage.removeItem('JWTtokenAmoTestApp')
            localStorage.removeItem('JWTtokenAmoTestApp')
            this.$router.push('/login')
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