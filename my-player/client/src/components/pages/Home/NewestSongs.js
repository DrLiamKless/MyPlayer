import React, { useState, useEffect } from 'react';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Song from '../../Song'

function NewestSongs() {

    const [newestSongs, setnNewsetSongs] = useState([])

    useEffect(() => {
      read("/songs/newest").then((res) => {
        setnNewsetSongs(res)
      });
    }, []);
  
  return (
    <div className={"home-section"} style={{backgroundColor: "rgba(0,31,63,0.79)"}}>
        <p>New Music For You</p>
        <div className={"all-songs-container"}>
            {newestSongs.map((song, i) => (
                <Song
                key={song.song_id}
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
                />
            ))}
        </div>
    </div>     
  );
}

export default NewestSongs;
