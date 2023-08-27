import { TextField } from "@mui/material";

export default function Step1({ inputValues, handleInputChange }) {
  return (
    <TextField
      label="Input for Step 1"
      name="step1Input"
      value={inputValues?.step1Input || ''}
      onChange={handleInputChange}
    />
  );
}
