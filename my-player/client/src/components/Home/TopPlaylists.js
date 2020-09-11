import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import Playlist from '../Playlist'
import axios from 'axios'

function TopPlaylists() {

    const [topPlaylists, setTopPlaylists] = useState([])

    useEffect(() => {
      axios.get("/top_playlists").then((res) => {
        setTopPlaylists(res.data)
      });
    }, []);
  
  return (
    <div className={"home-section"} style={{backgroundColor: "rgb(99,84,65)"}}>
        <p>Your Most Favorite Playlists</p>
        <div className={"all-songs-container"}>
            {topPlaylists.map((playlist, i) => (
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
    </div>     
  );
}

export default TopPlaylists;
