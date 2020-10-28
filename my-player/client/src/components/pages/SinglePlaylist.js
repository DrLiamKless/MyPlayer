import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Playlist from '../Playlist'
import { useParams } from "react-router-dom";
import Loader from '../Loader'
import { mixpanelTrackUrlChanged } from '../../analytics/analyticsManager'


function SinglePlaylist({ props, singleSong }) {
  let { id } = useParams() 
  const location = useLocation();

  const [singlePlaylistObject, setSinglePlaylistObject] = useState()
  
  useEffect(() => {
    mixpanelTrackUrlChanged(location.pathname)
  },[])

    useEffect(() => {
      read(`/api/v1/playlists/${id}`).then((res) => {
        setSinglePlaylistObject(res)
      });
    }, [id]);
  
    return (
      singlePlaylistObject ?
        <div className="App">
          <header className="App-header">
                  <Playlist
                    key={singlePlaylistObject.id}
                    playlist={singlePlaylistObject}
                  >
                  </Playlist>
          </header>
        </div>
        : <Loader/>
        );
}

export default SinglePlaylist;
