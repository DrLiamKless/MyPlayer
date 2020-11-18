import React, {useEffect} from 'react';
import 'fontsource-roboto';
import { mixpanelTrackUrlChanged } from '../../analytics/analyticsManager'
import { useLocation } from "react-router-dom";


function NoMatch({ setSongToPlay }) {
  const location = useLocation();
  
  useEffect(() => {
    mixpanelTrackUrlChanged(location.pathname);
  },[])
  
    const errorSong = {
        youtubeLink: "https://www.youtube.com/embed/fTRm3nyNpro",
        lyrics: "?לאן אלך"
      }

  return (
  <div className="page">
    <div className="no-match-container">
      <code>404</code>
      <p>You have reached a dead end.</p>
      <p>
        At least click 
        <strong style={{cursor: "pointer"}} onClick={()=>{setSongToPlay(errorSong)}}> HERE </strong>
         to play a song
      </p>
    </div>
  </div>
  );
}

export default NoMatch;