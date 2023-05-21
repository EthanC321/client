import React from 'react';
import { useEffect, useState } from 'react';

function Album() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    const jwtToken = localStorage.getItem("jwt");
    const [album, setAlbum] = useState([]);
    useEffect(() => {
        fetch(`https://myspotify.herokuapp.com/album?q=${query}`, {
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setAlbum(data)
            })
    }, [album])

    return (
        <div>
          <button>Add Comment</button>
          <h2>{album.name}</h2>
          <img src={album && album.images && album.images[0].url} alt={album.name} width={150} height={150} />
          {album && album.tracks && album.tracks.items.map((track) => (
            <React.Fragment key={track.id}>
              <a href={`/track?q=${track.id}`}>
                <h3>{track.name}</h3>
              </a>
              {track && track.artists.map((artist) => (
                <h4 key={artist.id}>{artist.name}</h4>
              ))}
            </React.Fragment>
          ))}
        </div>
      );
      


}


export default Album