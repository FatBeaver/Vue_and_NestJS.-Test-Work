<template>
    <div class="container">
        <form action="#">
            <h2>Страница авторизации</h2>
            
            <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    v-model="email"
                    :class="{'is-invalid': errors.email.error}"
                >
                <small
                    id="emailHelp"
                    class="form-text text-muted"
                    v-if="errors.email.error"
                    style="color: red !important;"
                >
                    {{errors.email.text}}
                </small>
            </div>
            
            <div class="form-group">
                <label for="exampleInputPassword1">Пароль</label>
                <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    v-model="password"
                    :class="{'is-invalid': errors.password.error}"
                >
                <small
                    id="passwordHelp"
                    class="form-text text-muted"
                    v-if="errors.password.error"
                    style="color: red !important;"
                >
                    {{errors.password.text}}
                </small>
            </div>
            
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="rememberMe">
                <label class="form-check-label" for="exampleCheck1">Запомнить меня</label>
            </div>
            
            <div class="row">
                <div class="col-lg-2 col-xl-2 col-md-3">
                    <button
                        type="submit"
                        class="btn btn-success"
                        @click.prevent="login"
                    >
                        Войти
                    </button>
                </div>
                
                <div class="col-lg-3 col-xl-3 col-md-4 d-flex justify-content-center">
                    <router-link
                        type="submit"
                        to="/registration"
                        class="btn btn-primary"
                    >
                        Регистрация
                    </router-link>
                </div>
            </div>
           
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data: () => ({
        email: '',
        password: '',
        rememberMe: true,
        errors: {
            email: {error: false, text: ''},
            password: {error: false, text: ''},
        }
    }),
    methods: {
        login() {
            this.formValidate()
            if (this.errors.email.error || this.errors.password.error) {
                return false
            }
            axios.post(
                'http://localhost:3000/auth/login',
                {
                    email: String(this.email),
                    password: String(this.password),
                    rememberMe: this.rememberMe
                }
            ).then((response) => {
                const data = response.data
                this.saveTokenAndRedirect(data)
            }).catch(error => {
                const errorData = error.response.data
                if (errorData.error_field == 'email') {
                    this.errors.email.error = true
                    this.errors.email.text = 'Пользователь с таким Email не найден'
                }
                if (errorData.error_field == 'password') {
                    this.errors.password.error = true
                    this.errors.password.text = 'Не правильный пароль'
                }
            })
        },
        saveTokenAndRedirect(data) {
            if (data.remember === true) {
                localStorage.setItem('JWTtokenAmoTestApp', data.jwt)
            } else {
                sessionStorage.setItem('JWTtokenAmoTestApp', data.jwt)
            }
            this.$router.push('/')
        },
        formValidate() {
            if (this.email.length <= 0) {
                this.errors.email.error = true
                this.errors.email.text = 'Поле Email не может быть пустым'
            } else {
                this.errors.email.error = false
                this.errors.email.text = ''
            }

            if (this.password.length < 6) {
                this.errors.password.error = true
                this.errors.password.text = 'Не менее 6ти символов'
            } else {
                this.errors.password.error = false
                this.errors.password.text = ''
            }

            return true
        }
    }
}
</script>