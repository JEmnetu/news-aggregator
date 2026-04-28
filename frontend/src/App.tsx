import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import BookmarksPage from './pages/BookmarksPage';
import ProtectedRoute from './components/ProtectedRoute';


function App() {


  // const handleLogin = async () => {
  //   //   await login(email, password)
  //   //   // const response: AuthResponse = await loginUser(email, password);
  //   //   // console.log(response);
  //   // }

  //   // const handleLogout = () => {
  //   //   logout()
  //   // }
  // }
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/' element={<ProtectedRoute> <HomePage /></ProtectedRoute>} />
        <Route path='/bookmarks' element={<ProtectedRoute> <BookmarksPage /> </ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
