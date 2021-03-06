import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import 'fontsource-roboto';
import Artist from '../../Artist'
import Loader from '../../Loader';

function TopArtists({topArtists}) {

    const responsive = {
      desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
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
    <h5>Your most favorite artists</h5>
      <>
        <Carousel
          additionalTransfrom={0}
          responsive={responsive}
          keyBoardControl={true}
          containerClass="carousel-container"
          itemClass="carousel-item">
          { topArtists && topArtists.length > 0 ?
            topArtists &&
          topArtists.map((artist, i) => (
            <Artist className={"song"}
            key={artist.artist_id}
            artist={artist}>
            </Artist>
          ))
            : !topArtists ?
            <div className="top-loader"><Loader/></div>
            : topArtists.length === 0 &&
            <div>
            <Link style={{ textDecoration: 'none' }} to="/Allartists">
              <h5 className="no-likes-artists-message">
              Go explore our artists!
              </h5>
            </Link>
            </div> 
          }
        </Carousel>
      </> 
    </div>     
  </>
  );
}

export default TopArtists;
