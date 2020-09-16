import React, { useState, useEffect } from 'react';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Playlist from '../../Playlist'
import Carousel from 'react-multi-carousel';

function TopPlaylists() {

    const [topPlaylists, setTopPlaylists] = useState([])

    useEffect(() => {
      read("/playlists/top").then((res) => {
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
      items: 6,
      },
      mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 6,
      },
  }

  
  return (
    <div className={"home-section"} style={{backgroundColor: "rgb(43,19,21)"}}>
        <p>Your Most Favorite Playlists</p>
        <Carousel
              responsive={responsive}
              keyBoardControl={true}
              containerClass="carousel-container"
              itemClass="carousel-item"
              infinite
              >
            {topPlaylists.map((playlist, i) => (
          <Playlist
          key={playlist.playlist_id}
          id={playlist.playlist_id}
          name={playlist.name}
          createdAt={playlist.created_at}
          uploadAt={playlist.upload_at}
          coverImg={playlist.cover_img}
          songsList={playlist.list_of_songs}
        >
        </Playlist>
            ))}
        </Carousel>
    </div>     
  );
}

export default TopPlaylists;
