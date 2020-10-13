import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Playlist from '../Playlist'
import { useParams } from "react-router-dom";
import Loader from '../Loader'

function SinglePlaylist({ props, singleSong }) {
  let { id } = useParams() 

  const [singlePlaylistObject, setSinglePlaylistObject] = useState([])


    useEffect(() => {
      read(`/api/v1/playlists/${id}`).then((res) => {
        setSinglePlaylistObject(res)
      });
    }, [id]);
  
    return (
        <div className="App">
          <header className="App-header">
                  <Playlist
                    key={singlePlaylistObject.id}
                    playlist={singlePlaylistObject}
                  >
                  </Playlist>
          </header>
        </div>
        );
}

export default SinglePlaylist;
