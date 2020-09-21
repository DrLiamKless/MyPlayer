import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Artist from '../../Artist'

function TopAlbums() {

    const [topArtists, setTopArtists] = useState([])

    useEffect(() => {
      read("/artists/top").then((res) => {
        setTopArtists(res)
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
    <div className={"home-section"} style={{backgroundColor: "rgb(99,84,65)"}}>
        <p>Your most favorite artists</p>
        <Carousel
              responsive={responsive}
              keyBoardControl={true}
              containerClass="carousel-container"
              itemClass="carousel-item"
              infinite
              >
            {topArtists.map((artist, i) => (
                <Artist className={"song"}
                key={artist.artist_id}
                artist={artist}
                >
                </Artist>
            ))}
            </Carousel>
        </div>     
  );
}

export default TopAlbums;
