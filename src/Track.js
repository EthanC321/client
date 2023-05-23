import React from 'react';
import { useEffect, useState } from 'react';

function Track() {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get("q");
    const jwtToken = localStorage.getItem("jwt");
    const [track, setTrack] = useState([]);
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState('');
    const [commentRating, setCommentRating] = useState(1);

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
                setTrack(data.data)
                console.log(track)
                setComments(data.comments)
            })
    }, [track])

    const comment = () => {
       const body = {
            body: commentBody,
            trackName: track.name,
            trackID: track.id,
            userID: localStorage.getItem("userID"),
            rating: commentRating
        }

        fetch('https://myspotify.herokuapp.com/track', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',                                                                                                 
            },
            body: JSON.stringify(body)
        })
        setCommentBody('')
        setCommentRating(1)
        //window.location.href = `/track?q=${query}`
    }

    return (
        <div>
            <input type="text" placeholder="Comment" value={commentBody} onChange={(e) => setCommentBody(e.target.value)} />
            <input type="number" min="1" max="5" placeholder="Rating" value={commentRating} onChange={(e) => setCommentRating(e.target.value)} />
            <button onClick={comment}>Add Comment</button>
            <h2>{track.name}</h2>
            <h3>{track && track.artists && track.artists[0].name}</h3>
            <img src={track && track.album && track.album.images && track.album.images[0].url} alt={track.name} width={150} height={150} />
            {comments.map((comment,index) => (
                <div style ={{ border: '1px solid black', padding: '10px' , paddingInline: '10px', margin: '10px' }}>
                    <h2>{comment.userID}</h2>
                    <h3>{comment.rating}</h3>
                    <h3>{comment.body}</h3>
                </div>
            ))}

        </div>
    )


}


export default Track