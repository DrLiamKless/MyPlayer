import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Playlist from '../Playlist'
import { useParams } from "react-router-dom";

function SinglePlaylist({ props, singleSong }) {
  let { id } = useParams() 

  const [singlePlaylistObject, setSinglePlaylistObject] = useState([])

    useEffect(() => {
      read(`/playlist/${id}`).then((res) => {
        setSinglePlaylistObject(res[0])
      });
    },[singlePlaylistObject]);
  
    return (
        <div className="App">
          <header className="App-header">
                  <Playlist
                    key={singlePlaylistObject.playlist_id}
                    id={singlePlaylistObject.playlist_id}
                    name={singlePlaylistObject.name}
                    createdAt={singlePlaylistObject.created_at}
                    uploadAt={singlePlaylistObject.upload_at}
                    coverImg={singlePlaylistObject.cover_img}
                    songsList={singlePlaylistObject.list_of_songs}
                  >
                  </Playlist>
          </header>
        </div>
        );
}

export default SinglePlaylist;
