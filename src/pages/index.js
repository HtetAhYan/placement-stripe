import React, { useEffect } from 'react'

import Header from '@/component/universal/Header';
import GetStartedPage from '@/component/home/Content';
import { useRouter } from 'next/router';
function index() {
const router=useRouter()
  useEffect(() => {
 
    const status = localStorage.getItem("status")
    status==="pending" && router.replace('/create-session')
    status === "success" && localStorage.clear('stripe')
    
})
  return (
    <div className='min-h-screen w-full bg-white'>
      <Header />
      <GetStartedPage/>
    </div>
  )
}

export default index 