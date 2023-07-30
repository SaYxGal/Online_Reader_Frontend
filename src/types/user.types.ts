interface IUser{
    id: string,
    name: string,
    role: string
}
interface IUserInput {
    name: string,
    email: string,
    password: string,
    repeatPassword: string
}