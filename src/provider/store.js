import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from '@/features/apiSlice'
import checkboxReducer from '@/features/checkboxSlice'
import btnReducer from '@/features/btnSlice'
import formDataReducer from '@/features/formDataSlice'
import stepperReducer from '@/features/stepperSlice'
export default configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    checkbox: checkboxReducer,
    btn: btnReducer, stepper: stepperReducer,
     formData: formDataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
},)