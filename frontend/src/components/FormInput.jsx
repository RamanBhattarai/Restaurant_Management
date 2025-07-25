import React from 'react';
import { TextField } from '@mui/material';
import { useField } from 'formik';

const FormInput = ({ label, type = 'text', ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <TextField
      {...field}
      label={label}
      type={type}
      fullWidth
      margin="normal"
      variant="outlined"
      error={!!errorText}
      helperText={errorText}
      {...props}
    />
  );
};

export default FormInput;