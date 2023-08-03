import { FieldProps } from 'formik'
import AsyncSelect from 'react-select/async'
import React from 'react'
import { useLazyGetGenresQuery } from '../../store/api/genre.api'
import { IGenre } from '../../types/genre.types';
interface IExtendedFieldProps extends FieldProps{
  className?: string,
  placeholder?: string
}
export default function CustomSelect({field, form: {touched, errors, setFieldValue}, className, placeholder}: IExtendedFieldProps) {
    const [getGenres, {isLoading}] = useLazyGetGenresQuery();
    const getGenresFunction = async (query = "") => {
        const genres = await getGenres().unwrap();
        return genres
    };
    const onChange = (options: readonly IGenre[]) => {
        setFieldValue(
          field.name,
          options
        );
    }
  return (
    <div className={className}>
        <AsyncSelect
         onChange={onChange}
         placeholder={placeholder}
         getOptionLabel={option => option.name}
         getOptionValue={option => option.id.toString()}
         isMulti
         isLoading={isLoading}
         defaultOptions
         value={field.value}
         loadOptions={getGenresFunction}
          />
        {touched[field.name] &&
        errors[field.name] && <div style={{color:"red", marginTop:"5px"}}>{errors[field.name]!.toString()}</div>}
    </div>
   );
}
