import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from '@mui/material';
import { toggleCheckbox } from '@/features/checkboxSlice';
import { toast } from 'react-hot-toast';

function Checker({required=null}) {
  const isChecked = useSelector((state) => state.checkbox.isChecked);
   const isClicked = useSelector((state) => state.btn.isClicked);
  const dispatch = useDispatch();
useEffect(() => {
    if (!isClicked && !isChecked) {
      toast.error('Get Startedxx');
    }
  }, [isClicked, isChecked]);
 
  
  return (
    <div className="flex items-center">
      <Checkbox required={required} color='success'  checked={isChecked} onChange={() => dispatch(toggleCheckbox())} />
      <p
        className={
          !isClicked && !isChecked
            ? 'ml-2 text-red-700 font-semibold  cursor-pointer mr-2'
            : 'ml-2 cursor-pointer text-green-900 font-semibold font-teko mr-2'
        }
        onClick={() => dispatch(toggleCheckbox())}
      >
        {!isChecked ? 'Please confirm Terms and Conditions' : 'I agree to the terms and conditions'}
      </p>    </div>
  );
}

export default Checker;
export const getStaticProps = async () => {
  const token= localStorage.getItem('access')
  const res = await fetch('https://api.github.com/repos/vercel/next.js',)
  const repo = await res.json()
  return { props: { repo } }
}