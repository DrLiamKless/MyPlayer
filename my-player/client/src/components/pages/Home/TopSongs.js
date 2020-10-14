import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Song from '../../Song'
import Loader from '../../Loader'


function TopSongs({ setSongToPlay }) {

    const [topSongs, setTopSongs] = useState();
    const [likeState, setLikeState] = useState(false);


    useEffect(() => {
      read("/api/v1/songs/top").then((res) => {
        setTopSongs(res)
      });
    }, [likeState]);
  
    const responsive = {
      desktop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 6,
      },
      tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      },
      mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      },
  }

  return (
    topSongs != null ?
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
                song={song}
                setSongToPlay={setSongToPlay}
                likeState={likeState}
                setLikeState={setLikeState}
                />
            ))}
            </Carousel>
    </div>     
    : <Loader/>
  );
}

export default TopSongs;
