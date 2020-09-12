import React, { useState, useEffect } from 'react';
import { read } from "../wrappers/ajax"
import 'fontsource-roboto';
import Song from './Song'
import { useParams } from "react-router-dom";

function SingleSong({ props, singleSong }) {
  let { title } = useParams() 

  const [singleSongObject, setSingleSongObject] = useState([])

    useEffect(() => {
      read(`/song/${title}`).then((res) => {
        console.log(res[0])
        setSingleSongObject(res[0])
      });
    },[singleSongObject]);
  
  return (
  <div className="App">
    <header className="App-header">
            <Song
              id={singleSongObject.song_id}
              youtubeLink={singleSongObject.youtube_link}
              albumId={singleSongObject.album_id}
              artistId={singleSongObject.artist_id}
              title={singleSongObject.title}
              length={singleSongObject.length}
              trackNumber={singleSongObject.track_number}
              lyrics={singleSongObject.lyrics}
              createdAt={singleSongObject.created_at}
              uploadAt={singleSongObject.upload_at}
              coverImg={singleSongObject.cover_img}
            >
            </Song>
    </header>
  </div>
  );
}

export default SingleSong;
