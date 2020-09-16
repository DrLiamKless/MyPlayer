import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Song from '../../Song'

function TopSongs() {

    const [topSongs, setTopSongs] = useState([])

    useEffect(() => {
      read("/songs/top").then((res) => {
        setTopSongs(res)
      });
    }, []);
  
    const responsive = {
      desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 6,
      },
      tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 6,
      },
      mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 6,
      },
  }

  return (
    <div className={"first-home-section"} style={{backgroundColor: "rgb(99,84,65)"}}>
        <p>Your Most Favorite Songs</p>
            <Carousel
              responsive={responsive}
              keyBoardControl={true}
              containerClass="carousel-container"
              itemClass="carousel-item"
              infinite
              >
          {topSongs.map((song, i) => (
                <Song
                key={song.song_id}
                id={song.song_id}
                youtubeLink={song.youtube_link}
                albumId={song.album_id}
                artistId={song.artist_id}
                song_name={song.song_name}
                length={song.length}
                trackNumber={song.track_number}
                lyrics={song.lyrics}
                createdAt={song.created_at}
                uploadAt={song.upload_at}
                artistCoverImg={song.artist_cover_img}
                />
            ))}
            </Carousel>
    </div>     
  );
}

export default TopSongs;
