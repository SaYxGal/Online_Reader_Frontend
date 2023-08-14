import React from "react";
import { IGenre } from "../../types/genre.types";
import { Box, Chip, Container } from "@mui/material";
interface IBookHeaderProps {
  title: string;
  description: string;
  genres: IGenre[];
}
export default function BookHeader({
  title,
  description,
  genres,
}: IBookHeaderProps) {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
      maxWidth={false}
    >
      <Box>
        <span>{title}</span>
        <img src="" />
      </Box>
      <Box
        sx={{
          flexBasis: "60%",
          border: "2px solid lightgray",
          borderRadius: 2,
          padding: 2,
          marginTop: 1
        }}
      >
        <label>Описание:</label>
        <p>{description}</p>
        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
          {genres.map((genre) => (
            <Chip
              sx={{ marginRight: "1rem" }}
              label={genre.name}
              key={genre.id}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
}
