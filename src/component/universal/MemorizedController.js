import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '@material-tailwind/react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { options } from '@/data/inputData/options';

export const MemoizedController = 
  ({ errors,
    name,
    control,
    defaultValue,
    typeValue,
    type,
    jsonName,
   
    onChangeField,
    register,isLoading // Pass this prop to Controller
  }) => {
    if (typeValue === 'input') {
      // Render an Input component
      return (
      
        
        <Input
     /*     
        readOnly={isLoading} */
        required
          {...register(jsonName)}
          error={errors?.[jsonName]?.message}
              className="border border-gray-300 bg-white text-gray-900 shadow-gray-900/5 placeholder-text-gray-500 rounded"
              label={name}
              containerProps={{ className: 'h-16' }}
             
          type={jsonName=== 'phoneNumber'?'number':type}
          control={control}
            
            />
          
     
      );
    }
    if (typeValue === 'file') return null;
  
    else {
      // Find the options array based on typeValue
      const selectedOptions =
        options.find((option) => option.value === typeValue)?.options || [];

      return (
        <Controller
          name={jsonName}
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel className='text-sm sm:text-lg'>{name}</InputLabel>
              <Select
             required
                {...field}
                value={field.value || ''}
                variant='filled'

                className='text-sm bg-white hover:bg-white sm:text-lg '
              >
                {selectedOptions.map((item) => (
                  <MenuItem key={item.label} value={item.label} >
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
      );
    }

    return null; // Handle other cases if needed
  }
;