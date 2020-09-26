import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import Song from '../Song'
import Loader from '../Loader'


function Allsongs({ setSongToPlay }) {

    const [songs, setSongs] = useState([]);
    const [likeState, setLikeState] = useState(false);


    useEffect(() => {
      read("/songs").then((res) => {
        setSongs(res)
      });
    }, [likeState]);
  
  return (
  songs != null ?
  <div className="App">
    <header className="App-header">
      <p>All Songs</p>
      <div className={"all-songs-container"}>
        {songs && songs.map((song, i) => (
            <Song
              key={song.song_id}
              song={song}
              setSongToPlay={setSongToPlay}
              likeState={likeState}
              setLikeState={setLikeState}
            >
            </Song>
        ))}
      </div>
    </header>
  </div>
  : <Loader/>
  );
}

export default Allsongs;
