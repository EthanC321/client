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
            setTracks(data.tracks.items)
            console.log(data.albums)
            setAlbums(data.albums.items)
        })
  },[])

  const gohome = () => {
    window.location.href = `/profile?jwt=${jwtToken}`
}

  return (
    <div>
      <h1>Search</h1>
      <button onClick = {gohome}>Back</button>
      <div>
      <h2>Albums</h2>
      {albums.map((album, index) => (
            <div id = 'Album' key={index}>
                <h2>{album.name}</h2>
                <img src={album.images[0].url} alt={album.name} height= '300' width= '300' />
            </div>))}   
      </div>
      <div>
      <h2>Tracks</h2>
      {tracks.map((track, index) => (
            <div id = 'Track' key={index}>
                <h2>{track.name}</h2>
                <img src={track.album.images[0].url} alt={track.name} height= '300' width= '300' />
            </div>))}
      </div>
      
    </div>
  );
}

export default Search
