import React from 'react';
import 'fontsource-roboto';

function NoMatch({ setSongToPlay }) {
  
    const errorSong = {
        youtube_link: "https://www.youtube.com/embed/fTRm3nyNpro",
        lyrics: "?לאן אלך"
      }

  return (
    <div className="App">
    <header className="App-header">
        <code>404</code>
      <p>You have reached a dead end.</p>
      <p>At leat click this button to play a song</p>
      <button onClick={()=>{setSongToPlay(errorSong)}}>play</button>
    </header>
  </div>
  );
}

export default NoMatch;