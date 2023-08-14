import React, { useEffect, useState } from "react";
import { useGetBookQuery, useLazyGetBookQuery } from "../../store/api/book.api";
import { Params, useNavigate, useParams } from "react-router-dom";
import { ImSpinner3 } from "react-icons/im";
import { AiOutlineSend } from "react-icons/ai";
import BookHeader from "../../components/BookHeader/BookHeader";
import { IBookFull } from "../../types/book.types";
import StickyHeadTable from "../../components/StickyHeadTable/StickyHeadTable";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Button, Container } from "@mui/material";

export default function BookPage(): JSX.Element {
  const params: Params = useParams();
  const navigate = useNavigate();
  const user = useTypedSelector((state) => state.userState.user);
  const {data:book, isLoading} = useGetBookQuery({bookId: (Number)(params.id), type:"full"});
  return (
    <div style={{ display: "flex", flexGrow: "1", flexDirection: "column" }}>
      {!isLoading && book && user ? (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <BookHeader
            title={book.title}
            description={book.description}
            genres={book.genres}
          />
          <StickyHeadTable items={(book as IBookFull).chapters} />
          {(user.id === (book as IBookFull).userId || user.role === 'ADMIN') && (
            <Container sx={{py:1}}>
              <Button variant="contained" onClick={() => navigate(`/books/${params.id}/chapters`)} endIcon={<AiOutlineSend />}>
                Добавить главу
              </Button>
            </Container>
          )}
        </div>
      ) : (
        <ImSpinner3 style={{ color: "black", fontSize: "2em" }} />
      )}
    </div>
  );
}
