import React from 'react';
import { Route, Routes } from 'react-router-dom';
// Import Pages
import HomePage from './pages/HomePage';
import ModulesPage from './pages/ModulesPage';

function App() {
  return (
    
    <div className='max-w-[1905px] m-auto'>

      <Routes>
        <Route path='/' element = {<HomePage />} />
        <Route path="/module/:id" element = {<ModulesPage />} />
      </Routes>
    </div>
  ); 
}

export default App;
