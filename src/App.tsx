import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import AddNotes from './components/AddNotes';
import ListNotes from './components/ListNotes';

const App: React.FC = () => {
  return (
    <Router>
      < Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<AddNotes />} />
        <Route path="/list-notes" element={<ListNotes />} />
      </Routes>
    </Router>
  );
};

export default App;
