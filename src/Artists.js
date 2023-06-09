
    import React from 'react';
import { useEffect, useState } from 'react';
import './Artists.css';

function Artists() {
    const [artists, setartists] = useState([])
    const jwtToken = localStorage.getItem("jwt");
    useEffect(() => {
        fetch('https://myspotify.herokuapp.com/top', {
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setartists(data.items)
            })
    }, []);

    const gohome = () => {
        window.location.href = `/profile?jwt=${jwtToken}`
    }

    return (
        <div>
            <button onClick={gohome}>Go back to Profile</button>
            <div id='Grid-Artists'>
                {artists.map((artists, index) => (
                    <div id='Artist-Artists' key={index}>
                        <h2>{artists.name}</h2>
                        <a href ={`/artist?q=${artists.id}`}>
                        <img src={artists.images[0].url} alt={artists.name} height='300' width='300' />
                        </a>        
                    </div>))}
            </div>
        </div>
    );
}

export default Artists;
