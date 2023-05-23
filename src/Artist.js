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
        <div id = 'Trackdiv'>
            <h2>{artist.name}</h2>
            <img id = 'Commentimg' src={artist && artist.images && artist.images[0].url} alt={artist.name} width={150} height={150}/>
            <input type="text" placeholder="Comment" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
            <input type="number" min="1" max="5" placeholder="Rating" value={commentRating} onChange={(e) => setCommentRating(e.target.value)} />
            <button onClick={comment}>Add Comment</button>
            {comments.map((comment,index) => (
                <div style={{border: '1px solid #1DB954', padding: '10px' , paddingInline: '10px', margin: '10px', borderRadius: '13px', background: '#1DB954' ,width:'600px'}}>
                    <h2>{comment.userID}</h2>
                    <h3>{comment.rating}</h3>
                    <h3>{comment.body}</h3>
                </div>
            ))}

        </div>
    )


}


export default Artist