// ProfilePage.js
import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import './Profile.css'

function ProfilePage() {
    const [user,setUsers] = useState('')
    const [img,setimg] = useState('')
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams)
    const jwtToken = urlParams.get("jwt");
    localStorage.setItem("jwt", jwtToken);
    console.log("JWT Token from URL: ", jwtToken);
    console.log("JWT Token from localStorage: ", localStorage.getItem("jwt"));

    useEffect(() => {
      fetch('https://myspotify.herokuapp.com/user',{
          credentials: 'include',
          headers: {
            'Authorization': 'Bearer ' + jwtToken
          }
        })
            .then(response => {
              response.json()
            })
            .then(data => {
            console.log(data);
            setUsers(data.display_name);
            console.log("img" + JSON.stringify(data.images[0]));
            setimg(data.images[0].url);
        })
          .catch(error => {
           console.error('Error:', error);
          });
    }, []);

    const gettop = () => {
      window.location.href = '/artists';
    };

  return (
    <div id = 'profile'>
      <h1 id = 'text'>Spotify Profile Page</h1>
      <h2>User: {user}</h2>
      <a>
        <img src = {img} alt="description" style={{height: '300', width: '300'}}/>
      </a>
      <button onClick={gettop}>Top Artists</button>
    </div>
  );
}

export default ProfilePage;
