// ProfilePage.js
import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './Profile.css'

function ProfilePage() {
    const [user,setUsers] = useState('')
    const [img,setimg] = useState('')
  

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const jwtToken = urlParams.get("jwt");
      localStorage.setItem("jwt", jwtToken);

        fetch('http://localhost:4000/user',{
          credentials: 'include',
          headers: {
            'Authorization': 'Bearer ' + jwtToken
          }
        })
            .then(response => response.json())
            .then(data => {
            console.log(data);
            setUsers(data.display_name);
            console.log("img" + JSON.stringify(data.images[0]));
            setimg(data.images[0].url);})
    }, []);

    const gettop = () => {
      window.location.href = '/artists';
    };

  return (
    <div id = 'profile'>
      <h1 id = 'text'>Profile Page</h1>
      <h2>User: {user}</h2>
      <a>
        <img src = {img} alt="description" style={{height: '300', width: '300'}}/>
      </a>
      <button onClick={gettop}>Top Artists</button>
    </div>
  );
}

export default ProfilePage;
