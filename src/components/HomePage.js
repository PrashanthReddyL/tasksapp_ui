import React, { useState } from "react";
import { Container, Box, Button, Typography, TextField, ThemeProvider, createTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import image from "./../assets/img.png";
import imagePlayStore from "./../assets/playStore.png";
import imageAppStore from "./../assets/appStore.png";

const HomePage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePostTaskClick = () => {
    navigate("/post-task");
  };

  const handleBrowseTasksClick = () => {
    navigate("/browse-tasks");
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = () => {
    // Handle submit logic, e.g., send the phone number to server or display message
    alert(`Phone number submitted: ${phoneNumber}`);
  };

  // Define custom theme
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976D2", // Primary color for buttons
      },
      background: {
        default: "#FBF8F0", // Default background color
        box1: "#e6f0ff", // Background color for Box 1
        box2: "#e6f0ff", // Background color for Box 2
      },
      text: {
        primary: "#000080", // Primary text color
      },
    },
    typography: {
      fontFamily: "Gothic A1, sans-serif", // Change the default font family
      h2: {
        fontWeight: 700, // Bold font weight for heading 2
      },
      h3: {
        fontWeight: 700, // Bold font weight for heading 3
      },
      h7: {
        fontWeight: 700, // Bold font weight for heading 7
      },
      button: {
        fontWeight: 700, // Bold font weight for buttons
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: "100vh", backgroundColor: "#FBF8F0", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <NavBar />
        <Container maxWidth="xl" sx={{ padding: "20px 0" }}>

          {/* Box 1 */}
          <Box
            sx={{
              backgroundColor: "#FBF8F0",
              boxShadow: "10px 10px 40px #d9d9d9, -10px -10px 40px #d9d9d9",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "0 180px",
              marginBottom: "20px",
            }}
          >
            <Box sx={{ width: "50%", textAlign: "center", marginTop: '20px' }}>
              <Typography
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Get Your Work Done
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: "80px" }}
              >
                Post any task. Receive best offers and Get it done.
              </Typography>

              <Typography
                variant="h2"
                sx={{
                  color: theme.palette.text.primary,
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Earn Money in your free time
              </Typography>
              <Typography
                variant="body1"
                sx={{ marginBottom: "80px" }}
              >
                Make an Offer and finish the task of your expertise.
              </Typography>
            </Box>
            <Box
              sx={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Box sx={{ marginBottom: "40px", marginTop: '20px' }}>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: "200px",
                    height: "60px",
                    marginBottom: "180px",
                    marginTop: "20px",
                    boxShadow: "5px 5px 5px #d9d9d9, -5px -5px 5px #d9d9d9",
                  }}
                  onClick={handlePostTaskClick}
                >
                  Post a Task
                </Button>
              </Box>
              <Button
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  textTransform: "none",
                  width: "200px",
                  height: "60px",
                  boxShadow: "5px 5px 5px #d9d9d9, -5px -5px 5px #d9d9d9",
                }}
                onClick={handleBrowseTasksClick}
              >
                Browse Tasks
              </Button>
            </Box>
          </Box>

          {/* Box 2 */}
          <Box sx={{ backgroundColor: "#FBF8F0", borderRadius: "10px", display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '0 180px', marginTop: '20px', boxShadow: "10px 10px 40px #d9d9d9, -10px -10px 40px #d9d9d9" }}>
            {/* Left side containing text and input box */}
            <Box sx={{ width: '50%', textAlign: 'center', paddingRight: '20px' }}>
              <Typography variant="h3" sx={{ color: theme.palette.text.primary, fontWeight: 'bold', marginBottom: '10px', marginTop: '40px' }}>Get our Mobile App</Typography>
              <Typography variant="h7" sx={{ fontWeight: 'bold' }}>Please enter your phone number and get the download link.</Typography>
              <TextField
                label="Phone Number"
                variant="outlined"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                sx={{ marginTop: '20px', width: 'calc(100% - 80px)' }} // Reduced width of the text field
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ marginTop: '20px', textTransform: 'none', marginLeft: '10px', boxShadow: "10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff" }} // Added margin to the left of the button
              >
                Get Link
              </Button>

              <Box sx={{ marginTop: '20px' }}>
                {/* Button for Play Store */}
                <Button
                  variant="text"
                  color="primary"
                  sx={{
                    borderRadius: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: "200px",
                    height: "60px",
                    marginBottom: "10px",
                    boxShadow: "10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff",
                    marginRight: '10px' // Added margin to the right of the button
                  }}
                  onClick={() => window.open("https://play.google.com/", "_blank")}
                >
                  <img src={imagePlayStore} alt="Mobile App" style={{ maxWidth: '100%', height: 'auto' }} />
                </Button>
                {/* Button for App Store */}
                <Button
                  variant="text"
                  color="primary"
                  sx={{
                    borderRadius: "10px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: "200px",
                    height: "60px",
                    marginBottom: "10px",
                    boxShadow: "10px 10px 30px #d9d9d9, -10px -10px 30px #ffffff",
                  }}
                  onClick={() => window.open("https://apps.apple.com/", "_blank")}
                >
                  <img src={imageAppStore} alt="Mobile App" style={{ maxWidth: '100%', height: 'auto' }} />
                </Button>
              </Box>
            </Box>
            {/* Right side containing image */}
            <Box sx={{ width: '50%', textAlign: 'center', paddingLeft: '20px', marginTop: '20px' }}>
              <img src={image} alt="Mobile App" style={{ maxWidth: '100%', height: 'auto' }} />
              
            </Box>
          </Box>

        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
