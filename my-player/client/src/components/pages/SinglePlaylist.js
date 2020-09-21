import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Playlist from '../Playlist'
import { useParams } from "react-router-dom";

function SinglePlaylist({ props, singleSong }) {
  let { id } = useParams() 

  const [singlePlaylistObject, setSinglePlaylistObject] = useState([])

    useEffect(() => {
      read(`/playlists/${id}`).then((res) => {
        setSinglePlaylistObject(res[0])
      });
    }, [id]);
  
    return (
        <div className="App">
          <header className="App-header">
                  <Playlist
                    key={singlePlaylistObject.playlist_id}
                    playlist={singlePlaylistObject}
                  >
                  </Playlist>
          </header>
        </div>
        );
}

export default SinglePlaylist;
