import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MemoizedController } from '@/component/universal/MemorizedController';
import { inputData } from '@/data/inputData/stepOneData';
import { stepTwoData } from '@/data/inputData/StepTwoData';
import { Button } from '@mui/material';
import Image from 'next/image';
import { usePostStudentDetailsMutation } from '@/features/apiSlice';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/router';
import ModalComponent from '@/component/universal/modal';

const schema = yup.object().shape({
  email: yup.string().email().required(),

  phoneNumber: yup
    .string()
    .matches(
      /^[0-9+\s-]+$/,
      'Phone number can only contain digits, plus sign, space, or hyphen'
    )
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number can be at most 15 digits')
    .required('Phone number is required'),
});
function App() {
  //file
  const [datas,setDatas]=useState([])
  const router=useRouter()
  const [clicked, setClicked] = useState(false);
 const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  const { handleSubmit, control, formState: { errors }, register } = useForm({
    resolver:yupResolver(schema)
  });

  useEffect(() => {
       const retrievedToken = localStorage.getItem('accessToken');
     if (clicked) {
      errors.email?.message.length>0 && toast.error(errors.email?.message, {
         duration: 2000
       })
      errors.phoneNumber?.message.length>0 &&   toast.error(errors.phoneNumber?.message, {
         duration: 3000
       })
     }
     retrievedToken && router.replace('/final-session')
   },[errors])
  
  const [createData, { isLoading }] = usePostStudentDetailsMutation()
  const handleClicked = () => {
    setClicked(true);
     setTimeout(() => {
        setClicked(false);
      
      }, 1000); 
  }
  const onSubmit = (data) => {
openModal()
    // Simulate form submission
    console.log(data, errors);
  toast.success('hi')
   setDatas(data)
  };
  const redirectNext = async () => {
   createData(datas).then(res=> localStorage.setItem('accessToken', res.data.createdStudent.token)).finally()
}

  const logo='https://imageupload.io/ib/BhJTGsxv79qecQD_1692764398.png'
  return (
    <div className="h-screen  flex flex-col items-center justify-center ">
    <div className='flex items-center mt-8'>
      <h1 className='text-center  text-[#0e1129] heading font-kanit text-3xl font-bold mr-2'>Registeration form</h1>
       <Image src={logo} alt="EDUSN" width={120} height={60}/></div>
      <form className="glass-container bg-opacity-0 backdrop-blur-lg 
      
      sm:shadow-md sm:bg-gradient-to-r sm:from-blue-50 sm:to-purple-90 rounded sm:w-[80%] w-[95%] min-h-[98%]
      items-center
       px-8 py-2 sm:p-12 gap-y-6 sm:gap-y-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10" onSubmit={handleSubmit(onSubmit)}>
        {inputData.map((field, index) => (
          <MemoizedController
            errors={errors}
            key={index}
            name={field.label}
            control={control}
            defaultValue=""
            typeValue={field.value}
            type={field.type}
            jsonName={field.jsonName}
            register={register}
            isLoading={isLoading}
          />
        ))}
        {stepTwoData.map((field, index) => (
          <MemoizedController key={index} name={field.label} control={control} defaultValue=""
            typeValue={field.value} type={field.type} jsonName={field.jsonName}   register={register}  isLoading={isLoading}/>
        ))}
 
   <ModalComponent isOpen={modalOpen} onClose={closeModal}>
        <h2 className="text-lg font-semibold  text-center">Please comfirm to proceed!</h2>
          <div className='flex items-center justify-between'><button className="btn btn-active btn-neutral" onClick={closeModal}>Cancel</button>
          
          <button className="btn btn-active btn-accent" onClick={redirectNext}>Confirm</button></div>
      </ModalComponent>
       
        <div className=" w-full items-center justify-end flex  ">
          <Button
            disabled={isLoading}
            color="success"
            className="sm:h-full w-1/3 sm:w-1/4 sm:p-2 mb-2 sm:mb-0 text-white bg-deep-purple-700 hover:bg-deep-purple-800 
            font-bold rounded focus:outline-none focus:shadow-outline"
            type="submit"
  onClick={handleClicked}
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default App;
