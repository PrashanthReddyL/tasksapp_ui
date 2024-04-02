/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { TextField, IconButton, Paper, Menu, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SortIcon from "@mui/icons-material/Sort";

const FilterBar = ({ onSearch, onSort }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterType, setFilterType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFilterClick = (event, type) => {
    setAnchorEl(event.currentTarget);
    setFilterType(type);
  };

  const handleCloseFilterMenu = () => {
    setAnchorEl(null);
    setFilterType(null);
  };

  const handleFilterSelection = (value) => {
    onSort(value);
    handleCloseFilterMenu();
  };
  
  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    onSearch(query);
  };
  

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "10px",
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow:
          "5px 5px 10px rgba(255, 255, 255, 0.5), -5px -5px 10px rgba(255, 255, 255, 0.5)", // Updated neumorphic shadow
      }}
    >
      <TextField
        placeholder="Search tasks..."
        variant="outlined"
        size="small"
        value={searchQuery}
        onChange={handleSearch}
        InputProps={{
          startAdornment: <SearchIcon />,
        }}
      />
      <IconButton
        sx={{ "&:hover": { color: "primary.main" } }}
        onClick={(event) => handleFilterClick(event, "Sort")}
      >
        <SortIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseFilterMenu}
      >
        <MenuItem onClick={() => handleFilterSelection("Price")}>Price</MenuItem>
        <MenuItem onClick={() => handleFilterSelection("Distance")}>Distance</MenuItem>
        <MenuItem onClick={() => handleFilterSelection("Date")}>Date</MenuItem>
      </Menu>
    </Paper>
  );
};

export default FilterBar;
