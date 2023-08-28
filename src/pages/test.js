
import { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input  onChange={handleFileChange} type='file' />
        <label>{filename}</label>
      </div>
      <button type="submit">Upload</button>
    </form>
  );
};

export default UploadForm;
