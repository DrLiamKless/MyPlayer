import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import Playlist from '../Playlist';





function Allplaylists() {

    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
      read("/playlists").then((res) => {
        setPlaylists(res)
      });
    }, []);
  

  return (
  <div className="App">
    <header className="App-header">
      <p>All Playlists</p>
      <div className={"all-songs-container"}>
        {playlists.map(playlist => (
            <Playlist
              key={playlist.playlist_id}
              playlist={playlist}
            >
            </Playlist>
        ))}
      
      </div>
    </header>
  </div>
  );
}

export default Allplaylists;
