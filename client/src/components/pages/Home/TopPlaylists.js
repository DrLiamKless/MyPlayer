import React from 'react';
import { Link } from 'react-router-dom';
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
    <div className={"home-playlists-section"}>
    <>
    <h5>Your Favorite Playlists</h5>
      <>
      <Carousel
            additionalTransfrom={0}
            responsive={responsive}
            keyBoardControl={true}
            containerClass="carousel-container"
            itemClass="carousel-item"
            infinite
            >
        { topPlaylists.length > 0 ?
          topPlaylists.map((playlist, i) => (
          <Playlist
            key={playlist.playlist_id}
            playlist={playlist}
          >
          </Playlist>
          ))
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
      </Carousel>
      </>
    </>
    </div>     

  );
}

export default TopPlaylists;
