import { Injectable, Inject } from '@nestjs/common';
import {Repository} from "typeorm";
import {User} from "../user/user.entity";
import {UserDto} from './../user/interfaces/user.interface'
const md5 = require('md5')
const crypto =  require('crypto')

@Injectable()
export class AuthService {
    public user: User

    // Секретный ключ для JWT
    private secretKey = '-_-jajusjawasdew123123ikas-_-dxzwe1321lsdawdsawd123-_-'

    constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<User>) {}

    // Проверка наличия юзера в системе по Email
    public async checkedUserByEmail(email: string, isLogin: boolean = false): Promise<boolean> {
        const user: undefined | User = await this.userRepository.findOne({email: email})
        if (typeof user === "undefined") {
            return false
        }
        this.user = isLogin ? user : undefined
        return true
    }

    // Проверка пароля на валидность
    public async checkPassword(newUser: UserDto): Promise<boolean> {
        return (this.getHash(newUser.password) === this.user.password) ? true : false
    }

    // Сохранение нового пользователя в БД
    public async saveUser(userData: UserDto): Promise<User> {
        let user = new User()
        user.password = this.getHash(userData.password)
        user.name = userData.name
        user.email = userData.email
        await this.userRepository.save(user)
        return user
    }

    // Генерация JWT токена
    public async generateToken(): Promise<string> {
        // Заголовок и тело токена
        const header: string = JSON.stringify({"alg": "SHA256", "typ": "JWT"})
        const body: string = JSON.stringify({"user_id": this.user.id, "exp": new Date()})
        // Кодированные заголовок и тело
        const base64header = new Buffer(header).toString('base64')
        const base64body = new Buffer(body).toString('base64')
        // Подпись JWT
        const signature = crypto.createHmac('SHA256', this.secretKey)
            .update(`${base64header}.${base64body}`).digest('base64')

        return `${base64header}.${base64body}.${signature}`
    }

    // Получение хэш-строки
    public getHash(value: string | number): string {
        return md5(String(value))
    }
}
