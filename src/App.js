import React from 'react';

import logo from './logo.svg';
import './App.css';
import TaskForm from './components/TaskForm';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import ReviewPage from './components/ReviewPage';
import { FormProvider } from './components/FormContext';
import BrowseTasks from './components/BrowseTasks';

const App = () => {
  return (
    <Router>
      <FormProvider>
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/post-task" element={<TaskForm/>} />
        <Route path="/review" element={<ReviewPage/>} />
        <Route path="/browse-tasks" element={<BrowseTasks />} />
      </Routes>
      </FormProvider>
    </Router>
  );
};

export default App;
