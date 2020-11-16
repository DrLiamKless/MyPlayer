import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { User } from '../../../contexts/userContext';
import 'fontsource-roboto';
import Playlist from '../../Playlist'
import Carousel from 'react-multi-carousel';
import Loader from '../../Loader'


function TopPlaylists({topPlaylists}) {

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
    <div className={"home-section"} style={{backgroundColor: "rgba(0,31,63,0.79)"}}>
    <>
    <h5>Your Favorite Playlists</h5>
      { topPlaylists.length > 0 ?
      <>
      <Carousel
            additionalTransfrom={0}
            responsive={responsive}
            keyBoardControl={true}
            containerClass="carousel-container"
            itemClass="carousel-item"
            infinite
            >
          {topPlaylists.map((playlist, i) => (
          <Playlist
            key={playlist.playlist_id}
            playlist={playlist}
          >
          </Playlist>
          ))}
      </Carousel>
      </>
        : !topPlaylists ?
          <Loader/>
        : topPlaylists.length === 0 &&
        <div>
          <Link style={{ textDecoration: 'none' }} to="/Allplaylists">
            <h5 className="no-likes-message">
              go to Playlists and create your own!
            </h5>
          </Link>
          </div> 
      }
    </>
    </div>     

  );
}

export default TopPlaylists;
