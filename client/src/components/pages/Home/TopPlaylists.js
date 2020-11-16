import React, { useState, useEffect, useContext } from 'react';
import { read } from "../../../wrappers/ajax"
import { User } from '../../../contexts/userContext';
import 'fontsource-roboto';
import Playlist from '../../Playlist'
import Carousel from 'react-multi-carousel';
import Loader from '../../Loader'


function TopPlaylists() {

    const [topPlaylists, setTopPlaylists] = useState("")
    const user = useContext(User)

    useEffect(() => {
      read(`/api/v1/playlists/top/${user.id}`).then((res) => {
        setTopPlaylists(res)
      });
    }, []);

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
    topPlaylists[0] ?
    <div className={"home-section"} style={{backgroundColor: "rgba(0,31,63,0.79)"}}>
        <p>{User.userName}, those are your Most Favorite Playlists</p>
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
    : <div>No Playlists Yet</div> 

  );
}

export default TopPlaylists;
