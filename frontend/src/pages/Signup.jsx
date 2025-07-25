import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Link, Grid, MenuItem, Typography } from '@mui/material';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import { useAuth } from '../services/auth';

const Signup = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'customer', // 'customer' or 'staff'
      staffCode: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
      userType: Yup.string().required('Required'),
      staffCode: Yup.string().when('userType', {
        is: 'staff',
        then: Yup.string().required('Staff code is required'),
      }),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await register(values);
        navigate('/login');
      } catch (error) {
        setFieldError('email', 'Registration failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout title="Sign up">
      <form onSubmit={formik.handleSubmit}>
        <FormInput name="name" label="Full Name" formik={formik} />
        <FormInput name="email" label="Email Address" formik={formik} />
        <FormInput name="password" label="Password" type="password" formik={formik} />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          formik={formik}
        />
        
        <FormInput
          name="userType"
          label="User Type"
          select
          formik={formik}
          onChange={(e) => {
            formik.setFieldValue('userType', e.target.value);
            formik.setFieldValue('staffCode', '');
          }}
        >
          <MenuItem value="customer">Customer</MenuItem>
          <MenuItem value="staff">Staff</MenuItem>
        </FormInput>
        
        {formik.values.userType === 'staff' && (
          <FormInput
            name="staffCode"
            label="Staff Access Code"
            formik={formik}
            helperText="Contact your administrator for the staff access code"
          />
        )}
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={formik.isSubmitting}
        >
          Sign Up
        </Button>
        
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default Signup;