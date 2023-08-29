import Checker from "@/component/universal/Checker";
import Header from "@/component/universal/Header";
import { stepTwoData } from "@/data/inputData/StepTwoData";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();
  const router = useRouter();
  const [required, isRequired] = useState(true);

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    Object.keys(data).forEach((fieldName) => {
      if (data[fieldName] instanceof FileList) {
        for (let i = 0; i < data[fieldName].length; i++) {
          formData.append('file', data[fieldName][i]);
          formData.append('upload_preset', 'flashCard');
        }
      }
    });

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
        console.log('Uploaded image URLs:', result.secure_url);
        // Further actions, e.g., update state with the URLs
      } else {
        console.error('Error uploading images');
      }
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <div className="bg-blue-gray-50 min-h-screen flex flex-col items-center">
      <Header />
      <div className="flex items-center h-[70vh]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col bg-white shadow-2xl justify-self-center p-6 rounded-lg gap-y-5"
        >
          <h1 className="font-semibold text">Please Upload required Document!</h1>
          {stepTwoData.map((stepTwo) => {
            if (stepTwo.value === "file") {
              return (
                <div className="flex flex-col" key={stepTwo.jsonName}>
                  <h1>{stepTwo.label}</h1>
                  <input
                    required
                    accept="image/*"
                    type="file"
                    className="file-input file-input-bordered file-input-lg w-full max-w-xs mt-2"
                    {...register(stepTwo.jsonName)}
                      // Add this attribute for multiple file selection
                  />
                </div>
              );
            }
            return null;
          })}
          <Checker required={required} />
          <Button
            type="submit"
            className="bg-primary hover:bg-primary"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
