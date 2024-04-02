import React from 'react';
import { Typography, Container, AppBar, Toolbar, Button, Box } from '@mui/material';

const NavBar = () => {
  return (
    // <Container maxWidth="xl" style={{ paddingLeft: 0, paddingRight: 0 }}>
    <AppBar position="static">
       {/* sx={{ backgroundColor: '#F4BB44' }}>  */}
        <Toolbar style={{ justifyContent: 'space-between', fontFamily: 'SF Pro Display, Arial, sans-serif' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold'}}>
            TaskPro
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
            <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button color="inherit" style={{ fontWeight: 'bold' }}>Services</Button>
              <Button color="inherit" style={{ fontWeight: 'bold' }}>About Us</Button>
              <Button color="inherit" style={{ fontWeight: 'bold' }}>FAQ's</Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: '10px' }}>
            <Button color="inherit" style={{ fontWeight: 'bold' }}>Login</Button>
            <Button color="inherit" style={{ fontWeight: 'bold' }}>Signup</Button>
          </Box>
        </Toolbar>
      </AppBar>
     
    // </Container>
  );
};

export default NavBar;
