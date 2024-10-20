import React from 'react'
import {Route, Routes, Outlet} from 'react-router-dom';
import './App.css';
import { Box } from '@mui/material';
import Home from './pages/Home';
function Web() {
  return (
    <Box width="400px" sx= {{ width: { xl: '1488px' }}} m = "auto">
       <Route path="/" element={<Home />} />
    </Box>
  );  
}

export default Web