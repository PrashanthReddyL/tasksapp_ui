import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Paper,
} from "@mui/material";


const TaskList = ({ tasks, selectedTask, handleTaskClick }) => {
  return (
    <Paper
                  elevation={0} // Remove elevation to maintain neumorphic effect
                  sx={{
                    padding: "20px",
                    height: "calc(100vh - 100px)",
                    overflowY: "auto",
                  }}
                >
                  {tasks.map((task, index) => (
                   <Paper
                   key={task.id}
                   elevation={0}
                   sx={{
                     padding: "10px",
                     marginBottom: "10px",
                     cursor: "pointer",
                     display: "flex",
                     justifyContent: "space-between", // Align items horizontally
                     alignItems: "center", // Align items vertically
                     backgroundColor: selectedTask && selectedTask.id === task.id ? "#e6f0ff" : "inherit", // Apply background color if selected
                   }}
                   onClick={() => handleTaskClick(task)}
                 >
                   <Box>
                     <Typography variant="h8" sx={{ fontWeight: "bold"}}>{task.taskName}</Typography>
                     <Typography variant="body2">{task.location}</Typography>
                     <Typography variant="body2">
                       {new Intl.DateTimeFormat("en-US", {
                         day: "2-digit",
                         month: "short",
                         year: "numeric",
                       }).format(new Date(task.when))}
                     </Typography>
                   </Box>
                   <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "1rem" }}>
                   ₹{task.price}
                   </Typography>
                 </Paper>
                 
                 
                 
                  ))}
                </Paper>  );
};

export default TaskList;
