import React, { useState, useEffect } from 'react';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Playlist from '../../Playlist'
import Carousel from 'react-multi-carousel';
import Loader from '../../Loader'


function TopPlaylists() {

    const [topPlaylists, setTopPlaylists] = useState([])
    const user = localStorage.getItem('user')

    useEffect(() => {
      read(`/api/v1/playlists/top/${user}`).then((res) => {
        setTopPlaylists(res)
      });
    }, [user]);

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
  topPlaylists === [] ?
  <>
    <p>you still dont have favorite playlists</p>
    <div className={"home-section"} style={{backgroundColor: "rgba(0,31,63,0.79)"}}>
      : 
        <p>{user}, those are your Most Favorite Playlists</p>
        <Carousel
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
    </div>     
  </>
    : <Loader/> 
    );
}

export default TopPlaylists;
