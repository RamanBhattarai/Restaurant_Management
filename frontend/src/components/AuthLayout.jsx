import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const AuthLayout = ({ children, title }) => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 4 }}>
          {title}
        </Typography>
        {children}
      </Box>
    </Container>
  );
};

export default AuthLayout;