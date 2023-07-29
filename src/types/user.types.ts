interface IUser{
    id: string,
    role: string
}
interface IUserInput {
    name: string,
    email: string,
    password: string,
    repeatPassword?: string
}