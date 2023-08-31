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
import { policiesDatas } from '@/data/policiesDatas';
import Checker from '@/component/universal/Checker';
import { useSelector } from 'react-redux';

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
  const [url,setUrl]=useState()
const [image,setImage]=useState()
 //onchange 
 const onChangePhoto = async () => {
  const file = image; // Get the selected file from the input
console.log(file);
  if (!file) {
    console.error('No file selected');
    return;
  }
 
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'flashCard');

  try {
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/di4a4oz3o/image/upload',
      {
        method: 'POST',
        body: formData,
      }
    );

    if (response.ok) {
      const result = await response.json();
    
      setUrl(result.secure_url);
    } else {
      console.error('Error uploading image');
    }
  } catch (error) {
    console.error('Error uploading image:', error);
  }
};  console.log(url);

  const isChecked = useSelector((state) => state.checkbox.isChecked);
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
    if (localStorage.getItem('stripe') !== 'stripe') {
      localStorage.removeItem('status')
      router.replace('/')
  
   }
/*     localStorage.setItem('status','pending') */
 
     if (clicked) {
      errors.email?.message.length>0 && toast.error(errors.email?.message, {
         duration: 2000
       })
      errors.phoneNumber?.message.length>0 &&   toast.error(errors.phoneNumber?.message, {
         duration: 3000
       })
     }

   },[errors])
  
  const [createData, { isLoading }] = usePostStudentDetailsMutation()
  const handleClicked = () => {
    setClicked(true);
     setTimeout(() => {
        setClicked(false);
      
     }, 1000); 
    onChangePhoto()
  }
  const onSubmit = (data) => {
openModal()
    // Simulate form submission
    console.log(data, errors);
  toast.success('hi')
   setDatas(data)
  };
const redirectNext = async () => {
    createData({ data: datas, url: url }).then(res => {
      localStorage.setItem('status','success');
      localStorage.removeItem('stripe')
    }).finally(() => {
        router.replace('/');
    });
};


  const logo='https://imageupload.io/ib/BhJTGsxv79qecQD_1692764398.png'
  return (
    <div className="h-screen  flex flex-col items-center justify-center " onClick={() =>  localStorage.setItem('status','pending')}>
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
          <h2 className="text-lg font-semibold  text-center">Terms and Conditions (Agreement)</h2>
          {policiesDatas.map((item, index) => (
            <li className='sm:leading-8 text-gray-750 leading-5 mt-2 text-sm' key={index}>{item}</li>
          ))}<p className='text-red-800  mt-2'>Important {"=>" }</p>
       
          <p className=' text-left text-red-700'>:
            After you submit, once we have reviewed and finalized the process,
            we will send a Zoom link to the email address provided in the form (Gmail) within one or two weeks,
            for your convenience. Please regularly check your Gmail.</p>
<Checker required={true}/>
     
          <div className='flex items-center justify-between'><button className="btn btn-active btn-neutral" onClick={closeModal}>Cancel</button>
          
          <button disabled={!isChecked} className="btn btn-active btn-accent" onClick={redirectNext}>Confirm</button></div>
      </ModalComponent>
               <div className="flex flex-col" >
                  <h1>Old Grade Report Card or Birth Certificate (မွေးစာရင်း)</h1>
            <input
              disabled={isLoading}
                    required
                    accept="image/*"
            type="file"
            
                    className="file-input  file-input-bordered file-input-lg w-full max-w-x mt-2"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </div>
        <div  className=" w-full flex items-center justify-end sm:col-start-2  ">
          <Button
            disabled={isLoading}
            color="success"
            className="
         

            sm:h-full w-1/3 sm:w-1/5 sm:p-2 mb-2 sm:mb-0 text-white bg-deep-purple-700 hover:bg-deep-purple-800 
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
