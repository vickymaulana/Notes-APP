import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Notespages from './pages/Notespages';

const App: React.FC = () => {
  return (
    <Router>
      < Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<Notespages />} />
      </Routes>
    </Router>
  );
};

export default App;
