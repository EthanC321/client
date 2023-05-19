import React from 'react';
import {Link} from 'react-router-dom';



function Search() {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("q");
  const jwtToken = localStorage.getItem("jwt");
  useEffect(() => {
        fetch(`https://myspotify.herokuapp.com/search?q=${query}`,{
          credentials: 'include',
          headers: {
            'Authorization': 'Bearer ' + jwtToken
          }
        })
        .then(response => response.json())
        .then(data => console.log(data))
  },[])

  const gohome = () => {
    window.location.href = `/profile?jwt=${jwtToken}`
}

  return (
    <div>
      <h1>Search</h1>
      <button onClick = {gohome}>Back</button>
    </div>
  );
}

export default Search
