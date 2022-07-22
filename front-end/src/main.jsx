import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom'; 
import AuthProvider from "./context/AuthProvider";
import App from './App';

import Register from './pages/Register';
import Login from "./pages/Login";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider value={{ authenticated: false }}>
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<App />} />      
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>
  </AuthProvider>
);
