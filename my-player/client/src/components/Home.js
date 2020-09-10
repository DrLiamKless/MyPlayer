import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import Song from './Song'
import axios from 'axios'

function Home() {

    const [songs, setSongs] = useState([])

    useEffect(() => {
      axios.get("/songs").then((res) => {
          setSongs(res.data)
      });
    }, []);
  
  return (
  <div className="App">
    <header className="App-header">
        {songs.map((song, i) => (
            <Song
              id={song.id}
              youtubeLink={song.Youtube_link}
              albumId={song.Album_id}
              artistId={song.Artist_id}
              title={song.Title}
              length={song.Length}
              trackNumber={song.track_number}
              lyrics={song.Lyrics}
              createdAt={song.Created_at}
              uploadAt={song.Upload_at}
            >
            </Song>
        ))}
    </header>
  </div>
  );
}

export default Home;
