import React, { useState, useEffect } from 'react';
import { read } from "../wrappers/ajax"
import 'fontsource-roboto';
import Song from './Song'

function Allsongs() {

    const [songs, setSongs] = useState([])

    useEffect(() => {
      read("/songs").then((res) => {
        setSongs(res)
      });
    }, []);
  
  return (
  <div className="App">
    <header className="App-header">
      <div className={"all-songs-container"}>
        {songs.map((song, i) => (
            <Song
              id={song.song_id}
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
