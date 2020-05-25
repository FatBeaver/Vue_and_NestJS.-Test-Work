export class UserDto {
    readonly id?: number | string
    readonly name?: string
    readonly email: string
    readonly password: string
    readonly rememberMe?: boolean
}