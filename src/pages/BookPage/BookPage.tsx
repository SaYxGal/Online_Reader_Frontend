import React from 'react'
import { useGetBookQuery } from '../../store/api/book.api'
import { Params, useParams } from 'react-router-dom'
import {ImSpinner3} from "react-icons/im"
import BookHeader from '../../components/BookHeader/BookHeader';
import BookChapters from '../../components/BookChapters/BookChapters';
import { IBookFull } from '../../types/book.types';

export default function BookPage(): JSX.Element {
    const params:Params = useParams();
    const {data:book, isLoading} = useGetBookQuery({bookId:(Number)(params.id), type: "full"});
  return (
    <div style={{display:"flex", flexGrow:"1", flexDirection:"column"}}>
        {
            !isLoading && book
            ?
            <div style={{display:"flex", flexDirection:"column"}}>
                <BookHeader title={book.title} description={book.description} genres={book.genres}/>
                <BookChapters chapters={(book as IBookFull).chapters}/>
            </div> 
            :
            <ImSpinner3 style={{ color: "black", fontSize: "2em" }} />
        }
    </div>
  )
}
