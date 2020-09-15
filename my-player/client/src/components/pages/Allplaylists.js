import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { read } from "../../wrappers/ajax"
import Playlist from '../Playlist';
import SinglePlaylist from './SinglePlaylist';



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
      <div className={"all-playlists-container"}>
        {playlists.map(playlist => (
            <Playlist
              key={playlist.playlist_id}
              id={playlist.playlist_id}
              name={playlist.name}
              createdAt={playlist.created_at}
              uploadAt={playlist.upload_at}
              coverImg={playlist.cover_img}
              songsList={playlist.list_of_songs}
            >
            </Playlist>
        ))}
      </div>
    </header>
  </div>
  );
}

export default Allplaylists;
