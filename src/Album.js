import React from 'react';
import { useEffect, useState } from 'react';
import './Album.css';

function Album() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    const jwtToken = localStorage.getItem("jwt");
    const [album, setAlbum] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const [commentRating, setCommentRating] = useState(1);

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
                setAlbum(data.data)
            })
    }, [album])

    const comment = () => {
        const body = {
            body: commentBody,
            albumName: album.name,
            albumID: album.id,
            userID: localStorage.getItem("userID"),
            rating: commentRating
        }
        fetch('https://myspotify.herokuapp.com/album', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(response => console.log(response))
        setCommentBody('')
        setCommentRating(1)
        window.location.href = `/album?q=${query}`
    }

    return (
        <div id = 'Trackdiv'>
            <h2>{album.name}</h2>
            <img id = 'Commentimg' src={album && album.images && album.images[0].url} alt={album.name} />
            <input type="text" placeholder="Comment" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
            <input type="number" min="1" max="5" placeholder="Rating" value={commentRating} onChange={(e) => setCommentRating(e.target.value)} />
            <button onClick={comment}>Add Comment</button>
            {album && album.tracks && album.tracks.items.map((track) => (
                <React.Fragment key={track.id}>
                    <a href={`/track?q=${track.id}`}>
                        <h3>{track.name}</h3>
                    </a>
                    {track && track.artists.map((artist, index) => (
                        <React.Fragment key={artist.id}>
                            <h4>{artist.name}</h4>
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
        </div>
    );



}


export default Album