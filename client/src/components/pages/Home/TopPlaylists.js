import React, { useState, useEffect, useContext } from 'react';
import { read } from "../../../wrappers/ajax"
import { User } from '../../../contexts/userContext';
import 'fontsource-roboto';
import Playlist from '../../Playlist'
import Carousel from 'react-multi-carousel';
import Loader from '../../Loader'


function TopPlaylists({topPlaylists}) {
  const user = useContext(User)


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
        { topPlaylists[0] ?
        <>
        <p>{user.userName}, those are your Most Favorite Playlists</p>
        <Carousel
              additionalTransfrom={0}
              responsive={responsive}
              keyBoardControl={true}
              containerClass="carousel-container"
              itemClass="carousel-item"
              infinite
              >
            {topPlaylists[0].Playlists.map((playlist, i) => (
            <Playlist
              key={playlist.playlist_id}
              playlist={playlist}
            >
            </Playlist>
            ))}
        </Carousel>
        </>
          : "No Playlists Yet" }
    </>
    </div>     

  );
}

export default TopPlaylists;
