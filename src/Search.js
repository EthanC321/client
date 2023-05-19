import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Search.css';


function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");
  const jwtToken = localStorage.getItem("jwt");
  const [tracks, setTracks] = useState([])
  const [albums, setAlbums] = useState([])
  const [artists, setArtists] = useState([])
  useEffect(() => {
    fetch(`https://myspotify.herokuapp.com/search?q=${query}`, {
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
        console.log(data.artists)
        setArtists(data.artists.items)
      })
  }, [])

  const gohome = () => {
    window.location.href = `/profile?jwt=${jwtToken}`
  }

  return (
    <div>
      <h1>Search</h1>
      <button onClick={gohome}>Back</button>
      <div id='Grid'>
        <div>
          <h1>Artists</h1>
          {artists.map((artist, index) => (
            <div id='Artist' key={index}>
              <h3>{artist.name}</h3>
              <a href = {`/artist?q=${artist.id}`}>
              <img src={artist.images[0].url || ''} alt={artist.name} height='300' width='300' />
              </a>
            </div>))}
        </div>
        <div>
          <h1>Albums</h1>
          {albums.map((album, index) => (
            <div id='Album' key={index}>
              <h3>{album.name}</h3>
              <img src={album.images[0].url || ''} alt={album.name} height='300' width='300' />
            </div>))}
        </div>
        <div>
          <h1>Tracks</h1>
          {tracks.map((track, index) => (
            <div id='Track' key={index}>
              <h3>{track.name}</h3>
              <a href={`/track?q=${track.id}`}>
                <img src={track.album.images[0].url || ''} alt={track.name} height='300' width='300' />
              </a>
            </div>))}
        </div>

      </div>
    </div>
  );
}

export default Search
