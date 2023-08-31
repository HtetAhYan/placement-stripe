import { toast } from "react-hot-toast";

export const handleGetStart = async (isChecked, createURL, dispatch) => {
  try {
    
    if (isChecked) {
      const { data } = await createURL();

      toast.promise(
        createURL().then(
          (response) => localStorage.setItem('stripe','stripe')
        ),
        {
          loading: 'Fetching data...',
          success: (response) => {
            console.log(response);
            return 'Data fetched successfully!';
          },
          error: 'An error occurred while fetching data.',
        },
        {
          style: {
            minWidth: '250px',
          },
        }
      );

      if (data && data.url) {
        // Open the URL in the same window
        window.location.href = data.url;
      }

      return data;
    } else {
      toast.error('Please confirm the terms and conditions');
      dispatch(toggleBtn());
    }
  } catch (error) {
    toast.error("An error occurred while fetching server information. Please try again later.");
  }
};
