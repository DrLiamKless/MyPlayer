import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Album from '../../Album'
import Loader from '../../Loader'


function TopAlbums() {

    const [topAlbums, setTopAlbums] = useState()

    useEffect(() => {
      read("/api/v1/albums/top").then((res) => {
        setTopAlbums(res)
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
  topAlbums != null ?
  <>
    <div className={"home-section"} style={{backgroundColor: "rgba(0,31,63,0.79)"}}>
      {topAlbums.length > 0 ?
        <>
          <p>Your most favorite albums</p>
          <Carousel
          responsive={responsive}
          keyBoardControl={true}
          containerClass="carousel-container"
          itemClass="carousel-item"
          infinite
          >
              {topAlbums.map((album, i) => (
                <Album
                key={album.albumId}
                album={album}
                />
                ))}
              </Carousel>
        </>
        : <p> you didnt selcted you top songs yet</p>
      }
    </div>     
  </>
  : <Loader/>
  ) 
}

export default TopAlbums;
