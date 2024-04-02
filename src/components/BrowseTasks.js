import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button,
  Grid,
  Paper,
  ThemeProvider,
  createTheme,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import NavBarOther from "./NavBarOther";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";
import FilterBar from "./FilterBar";
import TaskList from "./TaskList";

const MAP_API_KEY = "AIzaSyDDci29vLcCMCoAdxlt_dCp2RRA8Jem7uk";
const DEFAULT_LATITUDE = 17;
const DEFAULT_LONGITUDE = 78;

// Define custom theme for BrowseTasks component
const browseTasksTheme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Adjust primary color as needed
    },
    secondary: {
      main: "#dc004e", // Adjust secondary color as needed
    },
    background: {
      default: "#FBF8F0", // Adjust background color as needed
    },
  },
  typography: {
    fontFamily: "Gothic A1, sans-serif", // Use Lilita One font
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#FBF8F0", // Set neumorphic background color
          boxShadow: "1px 1px 4px #babecc, -1px -1px 1px #ffffff", // Add neumorphic shadow
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: "#FBF8F0", // Set neumorphic background color
          boxShadow: "5px 5px 10px #babecc, -5px -5px 10px #ffffff", // Add neumorphic shadow
        },
      },
    },
  },
});

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filteredTasks, setFilteredTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://tasksbackend.azurewebsites.net/api/tasks"
        );
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
          setFilteredTasks(data);
        } else {
          console.error("Failed to fetch tasks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };


// Search function to filter tasks based on search query
const handleSearch = (query) => {
  const filtered = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredTasks(filtered);
};

// Sort function to sort tasks based on selected sorting option
const handleSort = (type) => {
  let sortedTasks = [...filteredTasks];
  switch (type) {
    case "Price":
      sortedTasks.sort((a, b) => a.price - b.price);
      break;
    case "Distance":
      // Add sorting logic for distance if required
      break;
    case "Date":
      sortedTasks.sort((a, b) => new Date(a.when) - new Date(b.when));
      break;
    default:
      break;
  }
  setFilteredTasks(sortedTasks);
};


  return (
    <ThemeProvider theme={browseTasksTheme}>
      <Box sx={{ minHeight: "100vh" }}>
        <NavBarOther />
        <Box sx={{ marginTop: "20px" }}>
          <Container
            maxWidth="xl"
            disableGutters
            sx={{ paddingLeft: 3, paddingRight: 3 }}
          >
          
            <Grid container spacing={3}>
              
              <Grid item xs={12} md={3}>
              <FilterBar onSearch={handleSearch} onSort={handleSort} />
              <TaskList tasks={filteredTasks} selectedTask={selectedTask} handleTaskClick={handleTaskClick} />              </Grid>
              <Grid item xs={12} md={9}>
                <Paper
                  elevation={0} // Remove elevation to maintain neumorphic effect
                  sx={{
                    padding: "20px",
                    height: "calc(100vh - 100px)",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {selectedTask ? (
                    <Box sx={{ display: "flex", flex: 1 }}>
                      <Box sx={{ flex: "1", paddingRight: "20px" }}>
                        <Box
                          sx={{
                            marginBottom: "20px",
                          }}
                        >
                          <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold" }}
                          >
                            {selectedTask.taskName}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            marginBottom: "20px",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Estimated Duration :
                          </Typography>
                          <Typography variant="body1">
                            {selectedTask.estimatedDuration} hrs
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            marginBottom: "20px",
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Price:
                          </Typography>
                          <Typography variant="body1">
                            ₹ {selectedTask.price}
                          </Typography>
                        </Box>
                        <Box sx={{ marginBottom: "20px" }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Location:
                          </Typography>
                          <Typography variant="body1">
                            {selectedTask.location}
                          </Typography>
                        </Box>
                        <Box sx={{ marginBottom: "20px" }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Status:
                          </Typography>
                          <Typography variant="body1">
                            {selectedTask.status}
                          </Typography>
                        </Box>
                        <Box sx={{ marginBottom: "20px" }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold" }}
                          >
                            Posted By:
                          </Typography>
                          <Typography variant="body1">
                            {selectedTask.postedBy}
                          </Typography>
                        </Box>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: "bold", marginBottom: "10px" }}
                        >
                          Description:
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ whiteSpace: "pre-wrap" }}
                        >
                          {selectedTask.description}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          flex: "1",
                          display: "flex",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            flex: "1",
                            marginBottom: "20px",
                          }}
                        >
                          <LoadScript googleMapsApiKey={MAP_API_KEY}>
                            <GoogleMap
                              center={{
                                lat: DEFAULT_LATITUDE,
                                lng: DEFAULT_LONGITUDE,
                              }}
                              zoom={8}
                              mapContainerStyle={{
                                width: "100%",
                                height: "100%",
                              }}
                            >
                              {tasks.map((task) => (
                                <Marker
                                  key={task.id}
                                  position={{
                                    lat: task.latitude,
                                    lng: task.longitude,
                                  }}
                                  onClick={() => handleTaskClick(task)}
                                />
                              ))}
                            </GoogleMap>
                          </LoadScript>
                        </Box>
                        <Box sx={{ flex: "1" }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: "bold", marginBottom: "10px" }}
                          >
                            Photos:
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  ) : (
                    <LoadScript googleMapsApiKey={MAP_API_KEY}>
                      <GoogleMap
                        center={{
                          lat: DEFAULT_LATITUDE,
                          lng: DEFAULT_LONGITUDE,
                        }}
                        zoom={6}
                        mapContainerStyle={{
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        {tasks.map((task) => (
                          <Marker
                            key={task.id}
                            position={{
                              lat: task.latitude,
                              lng: task.longitude,
                            }}
                            onClick={() => handleTaskClick(task)}
                          />
                        ))}
                      </GoogleMap>
                    </LoadScript>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default BrowseTasks;
