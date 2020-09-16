import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Artist from '../Artist'
import { useParams } from "react-router-dom";

function SinglePlaylist({ props, singleSong }) {
  let { id } = useParams() 

  const [singleArtist, setSingleArtist] = useState([])

    useEffect(() => {
      read(`/artists/artist/${id}`).then((res) => {
        setSingleArtist(res[0])
      });
    },[]);
  
    return (
        <div className="App">
          <header className="App-header">
                  <Artist
                    key={singleArtist.playlist_id}
                    artist={singleArtist}
                  >
                  </Artist>
          </header>
        </div>
        );
}

export default SinglePlaylist;
