import React from 'react';
import {Link} from 'react-router-dom';

function LoginPage() {


  const login = () => {
    window.location.href = 'https://myspotify.herokuapp.com/login';
  };



  return (
    <div>
      <h1>Login</h1>
      <button id='login' onClick={login}>Login</button>
    </div>
  );
}

export default LoginPage;
