import React from 'react';
import { Modal, Box, Button } from '@mui/material';

const ModalComponent = ({ isOpen, onClose, children }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
          <Box className=" rounded-lg fixed top-1/2 left-1/2 transform
       -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg h-[15%] flex flex-col justify-between w-[90%] p-4 sm:w-1/5 ">
        
        {children}
      </Box>
    </Modal>
  );
};

export default ModalComponent;
