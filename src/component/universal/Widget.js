import { CldUploadWidget } from 'next-cloudinary';

export default function UploadForm() {
  // Define a callback function to handle the upload result
  const handleUploadResult = (event) => {
    console.log(event.info);
  };

  return (
      <CldUploadWidget
        
      cloudName="di4a4oz3o"
      uploadPreset="flashCard"
      onUploadResult={handleUploadResult}
    />
  );
}
