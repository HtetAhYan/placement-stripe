 import React from 'react'

import dynamic from 'next/dynamic';
import RulesContent from './RulesContent';
const Checker = dynamic(() => import('../universal/Checker'),{loading:() => <p>Loading...</p>})


const TermsPage=dynamic(()=> import('@/ui/TermsPage'),{loading:() => <p>Loading...</p>})
const Terms = dynamic(() => import('./Terms'), { loading: () => <p>Loading...</p> })
const Button=dynamic(() => import('../universal/Button'),{loading:() => <p>Loading...</p>})
function GetStartedPage() {

  return (
    <div className="flex">
      <div className="grid grid-cols-2 grid-rows-2 h-[92vh] media w-full">
              <div className="row-span-2 p-4 ">
                  <Terms/>
          <RulesContent />
          <div className='flex items-center justify-around mt-5'><Checker />
                  <Button/></div>
                  

        </div>
              <div className="row-span-2 p-4 lottie block">
                  <TermsPage/>
        </div>
      
      </div>
    </div>
  );
}

export default GetStartedPage;