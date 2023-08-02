import React from 'react'
import BookList from '../../components/BookList/BookList'

export default function BooksPage() {
  return (
    <div style={{flexGrow: "10", display:"flex", flexDirection: "column"}}>
      <BookList/>
    </div>
  )
}
