import React, { useState, useEffect, useContext } from 'react';
import { read } from "../../wrappers/ajax"
import Song from '../Song'
import Loader from '../Loader'
import { mixpanelTrackUrlChanged } from '../../analytics/analyticsManager'
import { useLocation } from "react-router-dom";
import { User } from '../../contexts/userContext';



function Allsongs({ setSongToPlay }) {
    const user = useContext(User);
    const [songs, setSongs] = useState([]);
    const [likeState, setLikeState] = useState(false);
    const location = useLocation();
  
    useEffect(() => {
      mixpanelTrackUrlChanged(location.pathname)
    },[])


    useEffect(() => {
      read(`/api/v1/songs`).then((res) => {
        setSongs(res);
        console.log(res);
      }).catch(err => {
        setSongs(false);
      })
    }, []);
  
  return (
    <div className="page">
    { songs.length > 0  ?
    <>
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
    </>
    : <Loader/>
    }
  </div>
  );
}

export default Allsongs;
