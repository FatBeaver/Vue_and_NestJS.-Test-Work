<template>
    <div>
        <Header />
    
        <router-view />
    </div>
</template>

<script>
import Header from '@/components/Header'

export default {
    name: 'main-layout',
    beforeCreate() {
        if (localStorage.getItem('JWTtokenAmoTestApp') === null &&
            sessionStorage.getItem('JWTtokenAmoTestApp') === null
        ) {
            this.$router.push('/registration')
        } else {
            const JWT = localStorage.getItem('JWTtokenAmoTestApp') ||
                sessionStorage.getItem('JWTtokenAmoTestApp')
            this.$store.dispatch('addToken', JWT)
        }
    },
    components: {
        Header
    }
}
</script>