import { IGenre } from "./genre.types";

export interface IBook{
    id: number,
    title: string,
    description: string,
    genres: IGenre[]
}
export interface IBookFull extends IBook{
    chapters: IGenre[],
}
export interface IBookData extends Omit<IBook, 'id'>{}