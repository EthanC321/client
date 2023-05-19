import React from 'react';
import { useEffect, useState } from 'react';

function Artist() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    const jwtToken = localStorage.getItem("jwt");
    const [artist, setArtist] = useState([]);
    useEffect(() => {
        fetch(`https://myspotify.herokuapp.com/artist?q=${query}`, {
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        })
            .then(response => response.json())
            .then(data => {
                setArtist(data)
            })
    }, [artist])

    return (
        <div>
            <h2>{artist.name}</h2>
            <img src = {artist && artist.images && artist.images[0].url} alt = {artist.name} width={150} height={150}/>

        </div>
    )


}


export default Artist