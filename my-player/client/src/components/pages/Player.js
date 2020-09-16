import React from 'react';
import 'fontsource-roboto';

function Player({ songToPlay }) {


  return (
    <div className={"player"} style={{backgroundColor: "rgb(43,19,21)"}}>
        <iframe src={songToPlay ?
         `${songToPlay}?autoplay=1` : 
         "https://img.icons8.com/cotton/2x/no-record.png"} 
          className={"video"}
          allow={"autoplay"}
          frameBorder={0}
          height={260}></iframe>
    </div>     
  );
}

export default Player;
