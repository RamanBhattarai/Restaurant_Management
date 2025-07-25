import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Link, Grid } from '@mui/material';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import { useAuth } from '../services/auth';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        await login(values.email, values.password);
        navigate('/profile');
      } catch (error) {
        setFieldError('password', 'Invalid credentials');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout title="Sign in">
      <form onSubmit={formik.handleSubmit}>
        <FormInput name="email" label="Email Address" formik={formik} />
        <FormInput name="password" label="Password" type="password" formik={formik} />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={formik.isSubmitting}
        >
          Sign In
        </Button>
        
        <Grid container>
          <Grid item xs>
            <Link href="/forgot-password" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/signup" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default Login;