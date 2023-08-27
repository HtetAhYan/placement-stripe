import React from 'react';

import Image from 'next/image';

function Header() {
  const logo='https://imageupload.io/ib/BhJTGsxv79qecQD_1692764398.png'
  return (
    <header className=" flex items-center p-4 w-full">
      <div className="mr-6 border-collapse">
        <Image src={logo} alt="EDUSN" width={120} height={60}/>
      </div>
    </header>
  );
}

export default Header;
