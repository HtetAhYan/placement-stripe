import { setFormData } from "@/features/formDataSlice";


export const handleNext = (isLastStep = null, activeStep = null,dispatch=null,  setActiveStep = null, fieldName = null, fieldValue = null, stepOneData) => {

      const newData = { ...stepOneData, [fieldName]: fieldValue };
    dispatch(setFormData({ stepOneData: newData }));
    if (!isLastStep) {
      dispatch(setActiveStep(activeStep + 1));
    }
};
    export const handlePrev = (isFirstStep,isLastStep,activeStep,dispatch,setActiveStep) => {
    if (!isFirstStep) {
      dispatch(setActiveStep(activeStep - 1));
    }
  };

  export const handleFormSubmit = () => {
    // Gather all form data from Redux store
    const formData = useSelector((state) => state.formData);
    console.log('Form Data:', formData);

    // Clear form data after submission
    dispatch(clearFormData());

    // Perform form submission logic here
  };

