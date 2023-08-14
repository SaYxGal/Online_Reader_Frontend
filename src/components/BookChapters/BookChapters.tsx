import React from 'react'
import { IChapterInfo } from '../../types/chapter.types'
import cl from "./BookChapters.module.css"
interface IBookChaptersProps {
  chapters: IChapterInfo[]
}
export default function BookChapters({ chapters }: IBookChaptersProps) {
  return (
    <div className={cl.container}>
      <h3>Главы:</h3>
      <div className={cl.tableWrapper}>
        <table>
          <thead>
            <tr>
              <th>
                Номер
              </th>
              <th>
                Название главы
              </th>
            </tr>
          </thead>
          <tbody>
            {
              chapters &&
              chapters.map((chapter, index) => (
                <tr key={index}>
                  <td>{chapter.order}</td>
                  <td>{chapter.title}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
