import { FieldProps } from 'formik'
import AsyncSelect from 'react-select/async'
import React from 'react'
import { useLazyGetGenresQuery } from '../../store/api/genre.api'
import { IGenre } from '../../types/genre.types';
import { MultiValue } from 'react-select';

export default function CustomSelect({field, form: {touched, errors, setFieldValue}, ...props}: FieldProps) {
    const [getGenres, {isLoading}] = useLazyGetGenresQuery();
    const getGenresFunction = async (query = "") => {
        const genres = await getGenres().unwrap();
        return genres
    };
    const onChange = (options: readonly IGenre[]) => {
        setFieldValue(
          field.name,
          options.map((item: IGenre) => item.id)
        );
    }
  return (
    <div>
        <AsyncSelect
         onChange={onChange}
         {...props}
         getOptionLabel={option => option.name}
         getOptionValue={option => option.id.toString()}
         isMulti
         isLoading={isLoading}
         defaultOptions
         loadOptions={getGenresFunction}
          />
        {touched[field.name] &&
        errors[field.name] && <div className="error">{errors[field.name]!.toString()}</div>}
    </div>
   );
}
