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
                console.log(data)
                console.log(data.artists[0])
                console.log(data.album)
                setTrack(data)
            })
    }, [])
    console.log(track)
    console.log(track.album)
    console.log(track.name)

    return (
        <div>
            <h2>{track.name}</h2>
        </div>
    )


}


export default Track