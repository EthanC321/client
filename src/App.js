import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import Artists from './Artists';

function App() {
  return (
      <Routes>
        <Route path="/login" element = {<LoginPage/>}/>
        <Route path="/profile"element = {<ProfilePage/>}/>
        <Route path="/" element = {<HomePage/>}/>
        <Route path = "/artists" element = {<Artists/>}/>
      </Routes>
  );
}

export default App