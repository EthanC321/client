// HomePage.js
import React from 'react';
import {Link} from 'react-router-dom';

const login = () => {
  window.location.href = '/login'
}

function HomePage() {
  return (
    <div>
      <h1>Welco to the Home Page</h1>
      <button onClick = {login}>Login</button>
    </div>
  );
}

export default HomePage
