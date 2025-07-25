import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Link, Grid, Typography } from '@mui/material';
import AuthLayout from '../components/AuthLayout';
import FormInput from '../components/FormInput';
import { useAuth } from '../services/auth';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const [emailSent, setEmailSent] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await resetPassword(values.email);
        setEmailSent(true);
      } catch (error) {
        formik.setFieldError('email', 'Password reset failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <AuthLayout title="Forgot Password">
      {emailSent ? (
        <>
          <Typography paragraph>
            We've sent an email to {formik.values.email} with instructions to reset your password.
          </Typography>
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            href="/login"
          >
            Back to Login
          </Button>
        </>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <Typography paragraph>
            Enter your email address and we'll send you a link to reset your password.
          </Typography>
          
          <FormInput name="email" label="Email Address" formik={formik} />
          
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={formik.isSubmitting}
          >
            Send Reset Link
          </Button>
          
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Remember your password? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;