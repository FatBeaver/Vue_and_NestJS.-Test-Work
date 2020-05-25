<template>
    <div class="container">
        <form action="#">
            <h2>Страница регистрации</h2>
    
            <div class="form-group">
                <label for="exampleInputPassword1">Имя</label>
                <input
                    v-model="name"
                    type="text"
                    class="form-control"
                    id="exampleInputName"
                    :class="{'is-invalid': errors.name.error}"
                >
                <small v-if="errors.name.error" id="nameHelp"
                       class="form-text text-muted"
                       style="color: red !important;"
                >
                    {{errors.name.text}}
                </small>
            </div>
            
            <div class="form-group">
                <label for="exampleInputEmail1">Email</label>
                <input
                    v-model="email"
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    :class="{'is-invalid': errors.email.error}"
                >
                <small id="emailHelp" class="form-text text-muted"
                       style="color: red !important;"
                       v-if="errors.email.error"
                >
                    {{errors.email.text}}
                </small>
            </div>
            
            <div class="form-group">
                <label for="exampleInputPassword1">Пароль</label>
                <input
                    v-model="password"
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    :class="{'is-invalid': errors.password.error}"
                >
                <small id="passwordHelp" v-if="errors.password.error"
                       class="form-text text-muted"
                       style="color: red !important;"
                >
                    {{errors.password.text}}
                </small>
            </div>
            
            <div class="form-group form-check">
                <input
                    v-model="rememberMe"
                    type="checkbox"
                    class="form-check-input"
                    id="exampleCheck1"
                >
                <label class="form-check-label" for="exampleCheck1">Запомнить меня</label>
            </div>
    
            <div class="row">
                <div class="col-lg-2 col-xl-2 col-md-3">
                    <button type="submit" class="btn btn-success" @click.prevent="registration">Регистрация</button>
                </div>
        
                <div class="col-lg-4 col-xl-4 col-md-5 d-flex justify-content-center">
                    <router-link
                        type="submit"
                        to="/login"
                        class="btn btn-primary"
                    >
                        Авторизироваться
                    </router-link>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        rememberMe: true,
        name: '',
        email: '',
        password: '',
        errors: {
            name: {error: false, text: ''},
            email: {error: false, text: ''},
            password: {error: false, text: ''},
        }
    }),
    methods: {
        registration() {
            this.formValidate()
            if (this.errors.name.error || this.errors.email.error || this.errors.password.error) {
                return false
            }
            axios.post(
                'http://localhost:3000/auth/registration',
                {
                    name: String(this.name),
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
                    this.errors.email.text = 'Данный Email уже занят.'
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
            if (this.name.length < 2) {
                this.errors.name.error = true
                this.errors.name.text = 'Не менее 2х символов'
            } else {
                this.errors.name.error = false
                this.errors.name.text = ''
            }
            
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