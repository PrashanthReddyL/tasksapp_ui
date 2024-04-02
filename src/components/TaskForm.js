import React, { useState } from 'react';
import { TextField, Button, Typography, Box, LinearProgress, Container, Grid, ThemeProvider, createTheme, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useForm } from './FormContext';
import { useNavigate } from 'react-router-dom';
import NavBarOther from './NavBarOther';

const TaskForm = () => {
  const [step, setStep] = useState(0);
  const { formData, setFormData } = useForm();
  const navigate = useNavigate();
  const [openReviewDialog, setOpenReviewDialog] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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


  const isStepValid = () => {
    switch (step) {
      case 0:
        return !!formData.taskName;
      case 1:
        return !!formData.when;
      case 2:
        return !!formData.description;
      case 3:
        return !!formData.price && !!formData.estimatedDuration;
      case 4:
        return !!formData.location;
      default:
        return true;
    }
  };

  const handleNextStep = () => {
    if (isStepValid()) {
      if (step < 4) {
        setStep(step + 1);
      }
    }
  };

  const handleOpenReviewDialog = () => {
    setOpenReviewDialog(true);
  };

  const handleCloseReviewDialog = () => {
    setOpenReviewDialog(false);
  };

  const taskFormTheme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: "#FBF8F0",
      },
    },
    typography: {
      fontFamily: "Gothic A1, sans-serif",
    },
  });

  const renderStep = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Enter Task Name</Typography>
            <TextField
              fullWidth
              name="taskName"
              label="Task Name"
              value={formData.taskName}
              onChange={handleChange}
              required
            />
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Enter Date</Typography>
            <TextField
              fullWidth
              name="when"
              label="When"
              type="date"
              value={formData.when}
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </>
        );
      case 2:
        return (
          <>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Enter Description</Typography>
            <TextField
              fullWidth
              name="description"
              label="Description"
              multiline
              rows={3}
              value={formData.description}
              onChange={handleChange}
              required
            />
          </>
        );
      case 3:
        return (
          <>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Enter Price and Duration</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="price"
                  label="Price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: <Typography>₹</Typography>,
                  }}
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  name="estimatedDuration"
                  label="Estimated Duration"
                  value={formData.estimatedDuration}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: <Typography>hrs</Typography>,
                  }}
                  required
                />
              </Grid>
            </Grid>
          </>
        );
      case 4:
        return (
          <>
            <Typography variant="subtitle1" align="center" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>Enter Location</Typography>
            <TextField
              fullWidth
              name="location"
              label="Location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider theme={taskFormTheme}>
      <Box sx={{ backgroundColor: '#FBF8F0', minHeight: '100vh' }}>
        <NavBarOther />
        <Container maxWidth="md" sx={{ py: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h5" gutterBottom align="center" sx={{ fontWeight: 'bold', mb: 4 }}>Add Task</Typography>
          <LinearProgress
            variant="determinate"
            value={(step + 1) / 5 * 100}
            sx={{ width: '100%', height: '10px', borderRadius: '5px', backgroundColor: '#f0f0f0', mb: 4 }}
          />
          <Box
            borderRadius={8}
            bgcolor="#FBF8F0"
            boxShadow="20px 20px 60px #d9d9d9, -20px -20px 60px #d9d9d9"
            p={2}
            width="100%"
            height="400px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            {renderStep(step)}
            <Grid container justifyContent="space-between" marginTop={2}>
              {step > 0 && (
                <Button variant="outlined" onClick={() => setStep(step - 1)}>Back</Button>
              )}
              {step < 4 ? (
                <Button variant="contained" color="primary" onClick={handleNextStep}>Next</Button>
              ) : (
                <Button variant="contained" color="primary" onClick={handleOpenReviewDialog}>Review</Button>
              )}
            </Grid>
          </Box>
        </Container>
        <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog}>
        <DialogTitle sx = {{fontWeight: 'bold'}}>Review</DialogTitle>
  <DialogContent
    sx={{
      padding: '20px',
      backgroundColor: '#FBF8F0',
      borderRadius: '5px',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      minWidth: '400px', // Adjust the width as needed
    }}
  >
    {/* Render the review content here */}
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
  </DialogContent>
  <DialogActions sx={{ padding: '20px', backgroundColor: '#FBF8F0', borderRadius: '5px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
    <Button variant="outlined" onClick={handleCloseReviewDialog}>Back</Button>
    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
  </DialogActions>
</Dialog>


      </Box>
    </ThemeProvider>
  );
};

export default TaskForm;
