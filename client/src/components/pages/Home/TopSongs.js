import React, { useState, useEffect } from 'react';
import { User } from '../../../contexts/userContext';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Song from '../../Song'
import Loader from '../../Loader'


function TopSongs({ setSongToPlay, topSongs }) {

  const [likeState, setLikeState] = useState(false);
  
  const responsive = {
    desktop: {
    breakpoint: { max: 3000, min: 1024 },
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
    <>
      <div className={"home-section"} style={{backgroundColor: "rgb(99,84,65)"}}>
      <h5>Your Most Favorite Songs</h5>
        <Carousel
          additionalTransfrom={0}
          responsive={responsive}
          keyBoardControl={true}
          containerClass="carousel-container"
          itemClass="carousel-item">
          {topSongs ?
          topSongs.map((song, i) => (
            <Song
            key={song.song_id}
            song={song}
            setSongToPlay={setSongToPlay}
            likeState={likeState}
            setLikeState={setLikeState}/>
          ))
            : <Loader/>}
        </Carousel>
      </div>     
    </>
  );
}

export default TopSongs;
