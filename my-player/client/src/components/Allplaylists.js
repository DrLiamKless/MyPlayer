import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import Song from './Song'
import axios from 'axios'
import Playlist from './Playlist';
import { Container, Typography } from '@material-ui/core';

function Allplaylists() {

    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
      axios.get("/playlists").then((res) => {
          setPlaylists(res.data)
      });
    }, []);
  
  return (
  <div className="App">
    <header className="App-header">
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
