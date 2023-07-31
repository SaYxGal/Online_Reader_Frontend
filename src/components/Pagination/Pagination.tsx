import React from 'react'
import { usePagination } from '../../hooks/usePagination'
import cl from './Pagination.module.css'
import { SetURLSearchParams } from 'react-router-dom';
import { IURLObject } from '../BookList/BookList';
interface IPaginationProps{
    page: number,
    changePage: ({ name, value }: IURLObject) => void,
    totalPages:number
}
export default function Pagination({page, totalPages, changePage}:IPaginationProps) : JSX.Element {
  const pagesArray = usePagination(totalPages);
  return (
    <div className={cl.pagination}>
        {
          pagesArray.map((p, index) => (
            <span
             key={p}
             className={page !== p ? cl.pagination_elem : cl.pagination_elem.concat(' ').concat(cl.active)}
             onClick={() => changePage({name:'page',value: p.toString()})}
             >{p}</span>
          ))
        }
    </div>
  )
}
