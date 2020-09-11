import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import Song from '../Song'
import axios from 'axios'

function TopSongs() {

    const [topSongs, setTopSongs] = useState([])

    useEffect(() => {
      axios.get("/top_songs").then((res) => {
        setTopSongs(res.data)
      });
    }, []);
  
  return (
    <div className={"home-section"} style={{backgroundColor: "rgb(99,84,65)"}}>
        <p>Your Most Favorite Songs</p>
        <div className={"all-songs-container"}>
            {topSongs.map((song, i) => (
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
                />
            ))}
        </div>
    </div>     
  );
}

export default TopSongs;
