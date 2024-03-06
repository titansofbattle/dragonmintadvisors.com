import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'

import Home from './pages/home'
import Portal from './pages/portal'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portal" element={<Portal />} />
      </Routes>
    </div>
  );
}

export default App;
