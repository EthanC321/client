import React from 'react';
import { useEffect, useState } from 'react';

function Artist() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    const jwtToken = localStorage.getItem("jwt");
    const [artist, setArtist] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const [commentRating, setCommentRating] = useState(1);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch(`https://myspotify.herokuapp.com/artist?q=${query}`, {
            credentials: 'include',
            headers: {
                'Authorization': 'Bearer ' + jwtToken
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setArtist(data.data)
                setComments(data.comments)
            })
    }, [artist])

    const comment = () => {

        const body = {
            body: commentBody,
            artistName: artist.name,
            artistID: artist.id,
            userID: localStorage.getItem("userID"),
            rating: commentRating
        }

        fetch('https://myspotify.herokuapp.com/artist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
        setCommentBody('')
        setCommentRating(1)
        window.location.href = `/artist?q=${query}`

    }

    return (
        <div>
            <input type="text" placeholder="Comment" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
            <input type="number" min="1" max="5" placeholder="Rating" value={commentRating} onChange={(e) => setCommentRating(e.target.value)} />
            <button onClick={comment}>Add Comment</button>
            <h2>{artist.name}</h2>
            <img src={artist && artist.images && artist.images[0].url} alt={artist.name} width={150} height={150} />
            {comments.map((comment,index) => (
                <div>
                    <h2>{comment.userID}</h2>
                    <h3>{comment.rating}</h3>
                    <h3>{comment.body}</h3>
                </div>
            ))}

        </div>
    )


}


export default Artist