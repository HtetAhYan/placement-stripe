import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { MemoizedController } from '@/component/universal/MemorizedController';
import { inputData } from '@/data/inputData/stepOneData';
import { stepTwoData } from '@/data/inputData/StepTwoData';
import { Button } from '@mui/material';
import Image from 'next/image';
import { usePostStudentDetailsMutation } from '@/features/apiSlice';
import axios from 'axios';

function App() {
  //file
    

  const { handleSubmit, control, setError, formState: { errors }, register } = useForm();

const [createData,{isLoading}]=usePostStudentDetailsMutation()
  const onSubmit = (data) => {
    // Simulate form submission
    console.log(data, errors);
    createData(data).then(res=>console.log(res))
  };

  const logo='https://imageupload.io/ib/BhJTGsxv79qecQD_1692764398.png'
  return (
    <div className="h-screen  flex flex-col items-center justify-center ">
    <div className='flex items-center mt-8'>
      <h1 className='text-center  text-[#0e1129] heading font-kanit text-3xl font-bold mr-2'>Registeration form</h1>
       <Image src={logo} alt="EDUSN" width={120} height={60}/></div>
      <form className="glass-container bg-opacity-0 backdrop-blur-lg 
      
      sm:shadow-md sm:bg-gradient-to-r sm:from-blue-50 sm:to-purple-90 rounded sm:w-[80%] w-[95%] min-h-[99%]
      items-center
       px-8 py-2 sm:p-12 gap-y-6 sm:gap-y-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10" onSubmit={handleSubmit(onSubmit)}>
        {inputData.map((field, index) => (
          <MemoizedController
            key={index}
            name={field.label}
            control={control}
            defaultValue=""
            typeValue={field.value}
            type={field.type}
            jsonName={field.jsonName}
      register={register}
          />
        ))}
        {stepTwoData.map((field, index) => (
          <MemoizedController key={index} name={field.label} control={control} defaultValue=""
            typeValue={field.value} type={field.type} jsonName={field.jsonName}   />
        ))}
 
  
       
        <div className=" relative w-1/3 justify-self-end sm:right-[-95%]">
          <Button
            disabled={isLoading}
            color="success"
            className="sm:h-full mb-10 w-full  mt-2 text-white bg-deep-purple-700 hover:bg-deep-purple-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default App;
