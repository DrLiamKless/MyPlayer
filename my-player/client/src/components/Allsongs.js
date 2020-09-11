import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import Song from './Song'
import axios from 'axios'

function Allsongs() {

    const [songs, setSongs] = useState([])

    useEffect(() => {
      axios.get("/songs").then((res) => {
          setSongs(res.data)
      });
    }, []);
  
  return (
  <div className="App">
    <header className="App-header">
      <div className={"all-songs-container"}>
        {songs.map((song, i) => (
            <Song
              id={song.id}
              youtubeLink={song.youtube_link}
              albumId={song.album_id}
              artistId={song.artist_id}
              title={song.title}
              length={song.length}
              trackNumber={song.track_number}
              lyrics={song.lyrics}
              createdAt={song.created_at}
              uploadAt={song.upload_at}
              coverImg={song.cover_img}
            >
            </Song>
        ))}
      </div>
    </header>
  </div>
  );
}

export default Allsongs;
