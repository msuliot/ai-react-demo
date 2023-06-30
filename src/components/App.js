import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chat from './Chat/Chat';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
