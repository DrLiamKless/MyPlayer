import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Album from '../../Album'
import Loader from '../../Loader'


function TopAlbums({topAlbums}) {


    const responsive = {
      desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      // partialVisibilityGutter: 40
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
    <div className={"home-section"} style={{backgroundColor: "rgba(0,31,63,0.79)"}}>
    <h5>Your most favorite albums</h5>
      <Carousel
        additionalTransfrom={0}
        responsive={responsive}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item">
        {topAlbums != null ?
          topAlbums.map((album, i) => (
            <Album
            key={album.albumId}
            album={album}
            />
          ))
        : <Loader/> }
      </Carousel>
    </div>     
  </>
  ) 
}

export default TopAlbums;
