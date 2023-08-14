import { IChapterInfo } from "./chapter.types";
import { IGenre } from "./genre.types";

export interface IBook{
    id: number,
    title: string,
    description: string,
    genres: IGenre[]
}
export interface IBookFull extends IBook{
    chapters: IChapterInfo[],
}
export interface IBookData extends Omit<IBook, 'id'>{}