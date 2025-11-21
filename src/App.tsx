import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './views/Home';
import Form from './views/Form';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>  
        <Route path="/" element={<Home />} />  
        <Route path="/create" element={<Form />} />
      </Routes>
    </Router>
  );
};

export default App;