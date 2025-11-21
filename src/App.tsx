import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Cambiar Switch a Routes
import Home from './views/Home';
import Form from './views/Form';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>  {/* Usamos Routes en lugar de Switch */}
        <Route path="/" element={<Home />} />  {/* Usamos element y pasamos el componente dentro */}
        <Route path="/create" element={<Form />} />  {/* Usamos element y pasamos el componente dentro */}
      </Routes>
    </Router>
  );
};

export default App;
