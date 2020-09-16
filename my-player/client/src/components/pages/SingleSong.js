import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Song from '../Song'
import { useParams } from "react-router-dom";

function SingleSong({ setSongToPlay }) {
  
  let { id } = useParams() 
  const [singleSongObject, setSingleSongObject] = useState([])

    useEffect(() => {
      read(`/songs/song/${id}`).then((res) => {
        setSingleSongObject(res[0])
      });
    }, []);
  
  return (
  <div className="App">
    <header className="App-header">
            <Song
              key={singleSongObject.song_id}
              song={singleSongObject}
              setSongToPlay={setSongToPlay}
            >
            </Song>
    </header>
  </div>
  );
}

export default SingleSong;
