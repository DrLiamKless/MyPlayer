import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { read } from "../../../wrappers/ajax"
import 'fontsource-roboto';
import Album from '../../Album'

function TopAlbums() {

    const [topAlbums, setTopAlbums] = useState([])

    useEffect(() => {
      read("/albums/top").then((res) => {
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
      items: 6,
      },
      mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 6,
      },
  }
  
  return (
    <div className={"home-section"} style={{backgroundColor: "rgba(0,31,63,0.79)"}}>
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
                key={album.album_id}
                id={album.album_id}
                artistCoverImg={album.artist_cover_img}
                albumCoverImg={album.album_cover_img}
                albumId={album.album_id}
                artistId={album.artist_id}
                album_name={album.album_name}
                createdAt={album.created_at}
                uploadAt={album.upload_at}
                />
            ))}
            </Carousel>
        </div>     
  );
}

export default TopAlbums;
