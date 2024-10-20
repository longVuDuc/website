import React from 'react';
import { BrowserRouter  as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}
function About() {
  return <h1>About Page</h1>;
}
export default App;
