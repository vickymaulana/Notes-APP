import React from 'react';
import ListNotes from '../components/ListNotes';
import AddNotes from '../components/AddNotes';
const Notespages: React.FC = () => {
  return (
    <div>
    <AddNotes />
    <ListNotes />
    </div>
  );
};

export default Notespages;
