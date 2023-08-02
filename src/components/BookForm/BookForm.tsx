import { Formik, useField, Form, Field } from 'formik';
import * as Yup from 'yup'
import React, { useEffect, useState } from 'react'
import { Params, useParams } from 'react-router-dom'
import { IBookData } from '../../types/book.types';
import {ImSpinner3} from "react-icons/im"
import cl from "./BookForm.module.css"
import CustomSelect from '../CustomSelect/CustomSelect';
import { useLazyGetBookQuery } from '../../store/api/book.api';
export default function BookForm(): JSX.Element {
   const params:Params = useParams();
   const [getBook, {isLoading}] = useLazyGetBookQuery();
   const [initialValues, setInitial] = useState<IBookData>({title:'',description:'', genres:[]});
   useEffect(() =>{
    const id:number = (Number)(params.id);
    if(id !== 0){
      getBook(id).unwrap().then((book) =>{
        setInitial({title:book.title, description: book.description, genres: book.genres})
      })
    }
   },[])
  return (
    !isLoading ?
    <Formik
     initialValues={initialValues}
     enableReinitialize={true}
     validationSchema={Yup.object({
      title: Yup.string()
        .max(15, 'Must be 20 characters or less')
        .required('Required'),
      description: Yup.string()
        .max(100, 'Must be 100 characters or less')
        .required('Required'),
      genres: Yup.array()
        .min(1, "Must be at least one genre")
        .required("Required"),
     })}
     onSubmit={(values, actions) =>{
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
     }}
    >
      {({ errors, touched }) => (
      <Form>
        <Field type="text" name="title" placeholder="Заголовок" />
        {errors.title && touched.title ? (
             <div>{errors.title}</div>
           ) : null}
        <Field as="textarea" type="text" name="description" placeholder="Описание" />
        {errors.description && touched.description ? (
             <div>{errors.description}</div>
           ) : null}
        {(Number)(params.id) !== 0 ?
          <div>Текущие жанры: {initialValues.genres.map((item) => <span key={item.id}>{item.name}</span>)}</div> : null
        }
        <Field component={CustomSelect} name="genres" placeholder="Выберите жанры:"/>
         <button type="submit">Submit</button>
      </Form>
      )}
    </Formik>
    : <div><ImSpinner3 style={{ color: "black", fontSize: "2em" }}/></div>
  );
}
