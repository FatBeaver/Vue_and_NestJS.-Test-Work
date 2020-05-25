import {Controller, Post, Body, Res, Header} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto} from './../user/interfaces/user.interface'

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/registration')
    public async registration(@Body() newUser, @Res() res) {
        if (newUser.email.length === 0 || newUser.name.length < 2 || newUser.password.length < 6) {
            return res.status(400).send({message: 'invalid_user_data', error_field: 'all'})
        }
        // Проверка юзера по Email на наличие в системе
        const issetUser = await this.authService.checkedUserByEmail(newUser.email)
        // Если есть то не создаем юзера
        if (issetUser === true) {
            return res.status(400).send({message: 'user_isset', error_field: 'email'})
        }
        // Если юзера нет в системе - регистрируем его
        const savedUser = await this.authService.saveUser(newUser)
        this.authService.user = savedUser
        // Если все ок, то выдаем JWT токен
        const JWT = await this.authService.generateToken()

        const successRegistrationObject = {
            success: true,
            jwt: JWT,
            remember: newUser.rememberMe || false,
        }
        return res.status(201).send(successRegistrationObject)
    }

    @Post('/login')
    public async login(@Body() userData: UserDto, @Res() res) {
        if (userData.email.length === 0 || userData.password.length < 6) {
            return res.status(400).send({message: 'invalid_user_data', error_field: 'all'})
        }
        // Проверка юзера по Email на наличие в системе
        const issetUser = await this.authService.checkedUserByEmail(userData.email, true)
        // Если юзера не существует то возвращаем ошибку
        if (issetUser === false) {
            return res.status(400).send({message: 'user_does_not_exist', error_field: 'email'})
        }
        // Проверка пароля на валидность
        const isValidPassword = await this.authService.checkPassword(userData)
        if (isValidPassword === false) {
            return res.status(400).send({message: 'invalid_password', error_field: 'password'})
        }
        // Если все ок, то выдаем JWT токен
        const JWT = await this.authService.generateToken()

        const successLoginObject = {success: true, jwt: JWT, remember: userData.rememberMe || false}
        return res.status(200).send(successLoginObject)
    }
}
