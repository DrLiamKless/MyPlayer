import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Song from '../Song'

function TopSongs() {

    const [topSongs, setTopSongs] = useState([])

    useEffect(() => {
      read("/top_songs").then((res) => {
        setTopSongs(res)
      });
    }, []);
  
  return (
    <div className={"first-home-section"} style={{backgroundColor: "rgb(99,84,65)"}}>
        <p>Your Most Favorite Songs</p>
        <div className={"all-songs-container"}>
            {topSongs.map((song, i) => (
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

export default TopSongs;
