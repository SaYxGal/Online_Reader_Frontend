import React from "react";
import { array, object, strictObject, string, TypeOf, z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useUploadBookChapterMutation } from "../../store/api/book.api";
import { Params, useNavigate, useParams } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import FileUpload from "../../components/ImageUpload/ImageUpload";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
const chapterUploadSchema = object({
    title: z.string().min(5),
    pages: array(z.instanceof(File)).min(1),
  });
type IFormInput = TypeOf<typeof chapterUploadSchema>;
export default function ChapterUploadPage() {
  const params: Params = useParams();
  const navigate = useNavigate();
  const id: number = Number(params.id);
  const [uploadImages] = useUploadBookChapterMutation();
  const methods = useForm<IFormInput>({
    resolver: zodResolver(chapterUploadSchema),
  });
  const onSubmitHandler: SubmitHandler<IFormInput> =  async(values) => {
    const formData = new FormData();
    if (values.pages && values.pages.length > 0) {
      values.pages.forEach((el, i) => formData.append(`pages[]`, el));
    }
    formData.append("title",values.title);
    formData.append("_method", "PUT");
    // Call the Upload API
    await uploadImages({id,formData});
    navigate(`/books/${id}`);
  };
  return (
    <ThemeProvider theme>
      <CssBaseline />
      <Container maxWidth={false}>
        <Box
          display="flex"
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexGrow: "1",
          }}
        >
          <Box display="flex" flexDirection="column" sx={{ width: "30%" }}>
            <FormProvider {...methods}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={methods.handleSubmit(onSubmitHandler)}
              >
                <TextField
                  label="Заголовок"
                  {...methods.register('title')}
                  defaultValue="Заголовок 1"
                  helperText={methods.formState.errors.title?.message}
                  error={!!methods.formState.errors.title}
                />
                <Typography
                  textAlign="center"
                  variant="h4"
                  component="h1"
                  gutterBottom
                >
                  Загрузка изображений для страниц
                </Typography>
                <FileUpload limit={5} name="pages" />
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  sx={{ py: "0.8rem", my: 2 }}
                >
                  Создать главу
                </Button>
              </Box>
            </FormProvider>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
