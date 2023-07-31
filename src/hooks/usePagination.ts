import React, { useMemo } from 'react'

export const usePagination = (totalPages:number) : number[] => {
  const pagesArray = useMemo(() =>{
    let array = [];
    for(let i = 1; i <=totalPages; ++i){
        array.push(i);
    }
    return array;
  },[totalPages])
  return pagesArray;
}
