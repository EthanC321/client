import React from 'react';
import { useEffect, useState } from 'react';

function Track() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    const jwtToken = localStorage.getItem("jwt");
    const [track, setTrack] = useState([]);
    useEffect(() => {
        fetch(`https://myspotify.herokuapp.com/track?q=${query}`, {
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        })
            .then(response => response.json())
            .then(data => setTrack(data))
    }, [])

    return(
        <div>
            <h2>{track.name}</h2>
            <h3>{track.artists.name}</h3>
            <img src = {track.album.images[0].url} alt= {track.name} />
        </div>
    )


}


export default Track