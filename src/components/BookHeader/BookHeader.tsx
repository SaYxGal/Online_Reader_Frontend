import React from 'react'
import { IGenre } from '../../types/genre.types'
interface IBookHeaderProps {
  title: string,
  description: string,
  genres: IGenre[]
}
export default function BookHeader({ title, description, genres }: IBookHeaderProps) {
  return (
    <div>
       <span>{title}</span>
      <div>
        <img/>
      </div>
      <div>
        <label>Описание:</label>
        <p>{description}</p>
        <div>
          {
            genres.map((genre) => (
              <div key={genre.id}>{genre.name}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
