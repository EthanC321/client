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
            .then(data => {
                setTrack(data)
            })
    }, [track])

    return (
        <div>
            <button>Add Comment</button>
            <h2>{track.name}</h2>
            <h3>{track && track.artists && track.artists[0].name}</h3>
            <img src = {track && track.album && track.album.images && track.album.images[0].url} alt = {track.name} width={150} height={150}/>

        </div>
    )


}


export default Track