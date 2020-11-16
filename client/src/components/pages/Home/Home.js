import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import 'fontsource-roboto';
import TopAlbums from './TopAlbums'
import TopSongs from './TopSongs'
import TopPlaylists from './TopPlaylists'
import TopArtists from './TopArtists'
import { mixpanelTrackUrlChanged } from '../../../analytics/analyticsManager'

function Home({ setSongToPlay }) {

  const location = useLocation();
  
  useEffect(() => {
    mixpanelTrackUrlChanged(location.pathname)
  },[])
  
  return (
  <div className="page">
      <TopSongs setSongToPlay={setSongToPlay}></TopSongs>
      <TopAlbums></TopAlbums>
      <TopArtists></TopArtists>
      <TopPlaylists></TopPlaylists>
  </div>
  );
}

export default Home;
