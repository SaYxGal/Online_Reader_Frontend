import cl from "./BookItem.module.css";
import { IBook } from "../../types/book.types";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
interface IBookItemProps {
  book: IBook;
}
export default function BookItem({ book }: IBookItemProps) {
  const navigate = useNavigate();
  return (
    <Card className={cl.card} sx={{ display: "flex", width:"550px" }}>
      <CardActionArea
        className={cl.bookWrapper}
        sx={{ display: "flex", justifyContent:"space-between" }}
        onClick={() => navigate(`/books/${book.id}`)}
      >
        <Box
          sx={{ display: "flex", flexDirection: "column", maxWidth: "300px" }}
        >
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {book.title}
            </Typography>
            <Box
              sx={{ display: "flex", flexDirection: "column", pl: 1, pb: 1 }}
            >
              <Typography
                variant="subtitle1"
                color="text.primary"
                component="div"
              >
                Описание
              </Typography>
              <Typography
                className={cl.text}
                variant="body2"
                color="text.secondary"
              >
                {book.description}
              </Typography>
            </Box>
          </CardContent>
          <Typography
            variant="subtitle1"
            color="text.primary"
            component="div"
            sx={{ pl: 2 }}
          >
            Жанры
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", pl: 1, pb: 1 }}>
            {book.genres.map((item) => (
              <Chip label={item.name} key={item.id} />
            ))}
          </Box>
        </Box>
        <CardMedia
          component="img"
          sx={{ width: 250 }}
          image="/vite.svg"
          alt="Изображение книги"
        />
      </CardActionArea>
    </Card>
  );
}
