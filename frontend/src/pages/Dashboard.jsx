import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useAuth } from '../services/auth';

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome, {currentUser?.name}
        </Typography>
        <Typography paragraph>
          You are logged in as a {currentUser?.userType}.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;