import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '@material-tailwind/react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { options } from '@/data/inputData/options';

export const MemoizedController = 
  ({
    name,
    control,
    defaultValue,
    typeValue,
    type,
    jsonName,
    onChangeField, // Pass this prop to Controller
  }) => {
    if (typeValue === 'input') {
      // Render an Input component
      return (
        <Controller
              name={jsonName}
              
          control={control}
          defaultValue={defaultValue}
          render={({ field }) => (
            <Input
              {...field}
              className="border border-gray-300 bg-white text-gray-900 shadow-gray-900/5 placeholder-text-gray-500 rounded"
              label={name}
              containerProps={{ className: 'h-16' }}
              value={field.value}
              type={type}
            
            />
          )}
        />
      );
    } else {
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
              <InputLabel>{name}</InputLabel>
              <Select
                {...field}
                value={field.value || ''}
             
              >
                {selectedOptions.map((item) => (
                  <MenuItem key={item.label} value={item.label}>
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
