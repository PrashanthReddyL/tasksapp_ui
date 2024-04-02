import React, { useState } from 'react';
import { Box, Button, Container, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from './FormContext';
import NavBarOther from './NavBarOther';

const ReviewPage = () => {
  const { formData } = useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const response = await fetch('https://tasksbackend.azurewebsites.net/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers here
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/');
        }, 1000); // Redirect to homepage after 5 seconds
      } else {
        console.error('Error submitting task:', response.statusText);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ backgroundColor: '#FBF8F0', minHeight: '100vh' }}>
      <NavBarOther />
      <Container
        maxWidth="md"
        style={{
          paddingTop: '20px',
          paddingBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom align="center" sx={{ marginBottom: '20px', fontWeight: 'bold' }}>
          Review
        </Typography>
        <Box
          sx={{
            bgcolor: 'white',
            borderRadius: 8,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            p: 2,
            width: '100%', // Match the width of TaskForm's inner box
            marginBottom: '20px',
          }}
        >
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Task Name:</strong> {formData.taskName}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>When:</strong> {formData.when}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Description:</strong> {formData.description}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Price: </strong> ₹ {formData.price} 
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Location:</strong> {formData.location}
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: '10px' }}>
            <strong>Estimated Duration:</strong> {formData.estimatedDuration} hrs
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" onClick={handleBack} sx={{ marginRight: '10px' }}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
            Submit
          </Button>
        </Box>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          message="Task successfully submitted!"
        />
      </Container>
    </Box>
  );
};

export default ReviewPage;
