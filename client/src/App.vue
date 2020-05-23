<template>
    <div id="app">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout.vue'
import AuthLayout from '@/layouts/AuthLayout.vue'

export default {
    computed: {
        layout() {
            return (this.$route.meta.layout || 'auth') + '-layout'
        }
    },
    components: {
        AuthLayout,
        MainLayout
    }
}
</script>

<style lang="scss">
@import "assets/main.css";
@import "~bootstrap";
</style>
