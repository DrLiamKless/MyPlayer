import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import Song from '../Song'
import Loader from '../Loader'
import { mixpanelTrackUrlChanged } from '../../analytics/analyticsManager'
import { useLocation } from "react-router-dom";



function Allsongs({ setSongToPlay }) {
    const [songs, setSongs] = useState([]);
    const [likeState, setLikeState] = useState(false);
    const location = useLocation();
  
    useEffect(() => {
      mixpanelTrackUrlChanged(location.pathname)
    },[])


    useEffect(() => {
      read(`/api/v1/songs`).then((res) => {
        setSongs(res)
      });
    }, [likeState]);
  
  return (
  songs.length > 0  ?
  <div className="page">
    <p>All Songs</p>
    <div className={"all-songs-container"}>
      {songs && songs.map((song, i) => (
          <Song
            key={song.song_id}
            song={song}
            setSongToPlay={setSongToPlay}
            likeState={likeState}
            setLikeState={setLikeState}
          >
          </Song>
      ))}
    </div>
  </div>
  : <Loader/>
  );
}

export default Allsongs;
