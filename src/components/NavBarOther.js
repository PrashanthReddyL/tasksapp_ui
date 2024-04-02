import React from 'react';
import { Typography, Container, AppBar, Toolbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from './FormContext'; // Import the FormContext if you're using it to store form data

const NavBarOther = () => {
  const navigate = useNavigate();
  const { clearFormData } = useForm(); // Assuming you have a clearFormData function in your FormContext to clear form data

  const handleTaskProClick = () => {
    clearFormData(); // Clear form data
    navigate('/'); // Navigate to the home page
  };

  return (
    <AppBar position="static"> {/* Apply orange background color */}
      <Toolbar style={{ justifyContent: 'space-between', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
        <Container maxWidth="xl"> {/* Setting maxWidth to "xl" to make it take the full width */}
          <Typography variant="h6" onClick={handleTaskProClick} style={{ cursor: 'pointer', fontWeight: 'bold', color: 'white' }}> {/* Set text color to white */}
            TaskPro
          </Typography>
          
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavBarOther;
