import React, { useState, useEffect, useContext } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
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
      <div className={"home-section"}>
      <h5>those are your Most Favorite Songs</h5>
        <Carousel
        additionalTransfrom={0}
        responsive={responsive}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item">
        { topSongs && topSongs.length > 0 ? 
          topSongs.map((song, i) => (
            <Song
            key={song.song_id}
            song={song}
            setSongToPlay={setSongToPlay}
            likeState={likeState}
            setLikeState={setLikeState}/>
            ))
      : !topSongs ?
      <div className="top-loader"><Loader/></div>
      : topSongs.length === 0 &&
    <div>
    <Link style={{ textDecoration: 'none' }} to="/Allsongs">
      <h5 className="no-likes-message">
      But You havnt liked any yet... Go explore our songs!
      </h5>
    </Link>
    </div> 
          }
        </Carousel>
      </div>     
    </>
  );
}

export default TopSongs;
