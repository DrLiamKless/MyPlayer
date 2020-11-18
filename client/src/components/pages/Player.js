import React, { useContext } from 'react';
import { User } from '../../contexts/userContext';
import 'fontsource-roboto';
import Draggable from 'react-draggable';


function Player({ songToPlay }) {
  const user = useContext(User);

  return (
    <Draggable>
      <div className="player">
        <h5>{songToPlay ? "Drag Me!" : `Hey ${user.userName}! Your Songs Will Play Here`}</h5>
        <div className={"iframe"} >
          {songToPlay &&
          <iframe title={"player"} src={
            `${songToPlay.youtubeLink}?autoplay=1`}
            className={"video"}
            allow={"autoplay"}
            frameBorder={0}
            height={"100%"} width={"100%"}>
          </iframe>
          }
        </div>     
      </div>
    </Draggable>
  );
}

export default Player;
