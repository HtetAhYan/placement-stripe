import React from 'react'

import Header from '@/component/universal/Header';
import GetStartedPage from '@/component/home/Content';
function index() {


  return (
    <div className='min-h-screen w-full bg-white'>
      <Header />
      <GetStartedPage/>
    </div>
  )
}

export default index 