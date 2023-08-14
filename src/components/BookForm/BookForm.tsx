import { Formik, useField, Form, Field } from 'formik';
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { Params, useNavigate, useParams } from 'react-router-dom'
import { IBook, IBookData } from '../../types/book.types';
import { ImSpinner3 } from "react-icons/im"
import cl from "./BookForm.module.css"
import CustomSelect from '../CustomSelect/CustomSelect';
import { useCreateBookMutation, useLazyGetBookQuery, useUpdateBookMutation } from '../../store/api/book.api';
export default function BookForm(): JSX.Element {
  const params: Params = useParams();
  const id:number = (Number)(params.id);
  const navigate = useNavigate();
  const [createBook] = useCreateBookMutation();
  const [updateBook] = useUpdateBookMutation();
  const [getBook, { isLoading }] = useLazyGetBookQuery();
  const [initialValues, setInitial] = useState<IBookData>({ title: '', description: '', genres: [] });
  useEffect(() => {
    if (id !== 0) {
      getBook({bookId:id}).unwrap().then((book) => {
        setInitial({ title: book.title, description: book.description, genres: book.genres })
      })
    }
  }, [])
  return (
    <div className={cl.wrapper}>
      <h1>{!id?"Создать":"Обновить"} книгу</h1>
      {!isLoading ?
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={Yup.object({
          title: Yup.string()
            .max(20, 'Должно быть меньше 20 символов')
            .required('Обязательное поле'),
          description: Yup.string()
            .max(100, 'Должно быть меньше 100 символов')
            .required('Обязательное поле'),
          genres: Yup.array()
            .min(1, "Должен быть выбран хотя бы один жанр")
            .required("Обязательное поле"),
        })}
        onSubmit={async(values, actions) => {
          !id ? await createBook(values) : await updateBook({id: id, ...values});
          navigate('/');
        }}
      >
        {({ errors, touched }) => (
          <Form className={cl.form}>
            <label htmlFor="title">Заголовок</label>
            <Field type="text" name="title" placeholder="Заголовок" />
            {errors.title && touched.title ? (
              <div className={cl.error}>{errors.title}</div>
            ) : null}
            <label htmlFor="description">Описание</label>
            <Field as="textarea" type="text" name="description" placeholder="Описание" />
            {errors.description && touched.description ? (
              <div className={cl.error}>{errors.description}</div>
            ) : null}
            <label htmlFor="genres">Жанры:</label>
            <Field className={cl.customSelect} component={CustomSelect} name="genres" placeholder="Выберите жанры:" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
      : <ImSpinner3 style={{ color: "black", fontSize: "2em" }} />}
    </div>
  );
}
