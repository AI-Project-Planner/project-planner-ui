import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import FormPage from "../FormPage/FormPage"

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/form" element={<FormPage />} />
      </Routes>
    </div>
  );
}

export default App;
