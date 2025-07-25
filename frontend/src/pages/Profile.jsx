import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Typography, Box, Tab, Tabs, Alert } from '@mui/material';
import FormInput from '../components/FormInput';
import { useAuth } from '../services/auth';

const Profile = () => {
  const { currentUser, updateProfile, changePassword, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);
  const [successMessage, setSuccessMessage] = React.useState('');
  
  // Profile update form
  const profileFormik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateProfile(values);
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        profileFormik.setFieldError('email', 'Update failed. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Password change form
  const passwordFormik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      currentPassword: Yup.string().required('Required'),
      newPassword: Yup.string()
        .min(8, 'Must be at least 8 characters')
        .required('Required'),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Required'),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await changePassword(values.currentPassword, values.newPassword);
        setSuccessMessage('Password changed successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
        resetForm();
      } catch (error) {
        passwordFormik.setFieldError('currentPassword', 'Current password is incorrect');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Profile Management
        </Typography>
        
        {successMessage && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {successMessage}
          </Alert>
        )}
        
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)}>
          <Tab label="Profile Details" />
          <Tab label="Change Password" />
        </Tabs>
        
        {activeTab === 0 && (
          <Box component="form" onSubmit={profileFormik.handleSubmit} sx={{ mt: 3 }}>
            <FormInput name="name" label="Full Name" formik={profileFormik} />
            <FormInput name="email" label="Email Address" formik={profileFormik} />
            
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mr: 2 }}
              disabled={profileFormik.isSubmitting}
            >
              Update Profile
            </Button>
          </Box>
        )}
        
        {activeTab === 1 && (
          <Box component="form" onSubmit={passwordFormik.handleSubmit} sx={{ mt: 3 }}>
            <FormInput
              name="currentPassword"
              label="Current Password"
              type="password"
              formik={passwordFormik}
            />
            <FormInput
              name="newPassword"
              label="New Password"
              type="password"
              formik={passwordFormik}
            />
            <FormInput
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              formik={passwordFormik}
            />
            
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mr: 2 }}
              disabled={passwordFormik.isSubmitting}
            >
              Change Password
            </Button>
          </Box>
        )}
        
        <Button
          variant="outlined"
          color="error"
          sx={{ mt: 3 }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;