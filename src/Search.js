import React from 'react';
import {Link} from 'react-router-dom';
import { useEffect, useState } from 'react';



function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");
  const jwtToken = localStorage.getItem("jwt");
  const [tracks, setTracks] = useState([])
  const [albums, setAlbums] = useState([])
  useEffect(() => {
        fetch(`https://myspotify.herokuapp.com/search?q=${query}`,{
          credentials: 'include',
          headers: {
            'Authorization': 'Bearer ' + jwtToken
          }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.tracks)
            setTracks(data.tracks)
            console.log(data.albums)
            setAlbums(data.albums)
        })
  },[])

  const gohome = () => {
    window.location.href = `/profile?jwt=${jwtToken}`
}

  return (
    <div>
      <h1>Search</h1>
      <button onClick = {gohome}>Back</button>
    </div>
  );
}

export default Search
