import React from 'react';
import { useEffect, useState } from 'react';

function Album() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    const jwtToken = localStorage.getItem("jwt");
    const [album, setAlbum] = useState([]);
    useEffect(() => {
        fetch(`https://myspotify.herokuapp.com/alubm?q=${query}`, {
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        })
            .then(response => response.json())
            .then(data => {
                setAlbum(data)
            })
    }, [artist])

    return (
        <div>
            <h2>{album.name}</h2>
            <img src={album && album.images && album.images[0].url} alt={album.name} width={150} height={150} />

        </div>
    )


}


export default Album