export interface IGenre{
    id: number,
    name: string
}
export interface IGenreData extends Omit<IGenre, 'id'>{}