import React from 'react'
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import { Button } from '@mui/material';
import { handleGetStart } from '@/func/handleGetStart';
import { useDispatch, useSelector } from 'react-redux';
import { useGetStripeUrlMutation } from '@/features/apiSlice';
function ButtonStart() {
       const isChecked = useSelector((state) => state.checkbox.isChecked);
       const [createURL,{isLoading,isError}]= useGetStripeUrlMutation()
  
  const dispatch = useDispatch();
 
  return (
     <Button disabled={isLoading} onClick={() => handleGetStart(isChecked,createURL,dispatch)} variant="contained" className='bg-primary' endIcon={<PlayCircleFilledIcon/>} >
  Get Started
      </Button>
  )
}

export default ButtonStart