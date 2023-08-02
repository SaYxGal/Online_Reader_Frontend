interface IUser{
    id: string,
    name: string,
    role: "ADMIN"|"USER"
}
interface IUserInput {
    name: string,
    email: string,
    password: string,
    repeatPassword: string
}