import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import Song from '../Song'

function Allsongs({ setSongToPlay }) {

    const [songs, setSongs] = useState([])

    useEffect(() => {
      read("/songs").then((res) => {
        setSongs(res)
      });
    }, []);
  
  return (
  <div className="App">
    <header className="App-header">
      <p>All Songs</p>
      <div className={"all-songs-container"}>
        {songs.map((song, i) => (
            <Song
              key={song.song_id}
              song={song}
              setSongToPlay={setSongToPlay}
            >
            </Song>
        ))}
      </div>
    </header>
  </div>
  );
}

export default Allsongs;
