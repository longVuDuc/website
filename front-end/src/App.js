import React from 'react';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Product_Detail from './pages/Product_detail';
import Mangage_product from './pages/Manage_product';
import Login from './pages/Login';
import SignUp from './pages/signup';
import Dashboard from './admin/dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Product_Detail/:id" element={<Product_Detail />} />
        <Route path="/Mangage_product" element={<Mangage_product />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;