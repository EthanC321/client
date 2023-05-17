import React from 'react';
import {Link} from 'react-router-dom';

function LoginPage() {


  const login = () => {
    window.location.href = 'http://localhost:4000/login';
  };



  return (
    <div>
      <h1>Login Page</h1>
      <button id='login' onClick={login}>Login</button>
    </div>
  );
}

export default LoginPage;