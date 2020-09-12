import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Playlist from '../Playlist'

function TopPlaylists() {

    const [topPlaylists, setTopPlaylists] = useState([])

    useEffect(() => {
      read("/top_playlists").then((res) => {
        setTopPlaylists(res)
      });
    }, []);
  
  return (
    <div className={"home-section"} style={{backgroundColor: "rgb(43,19,21)"}}>
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
