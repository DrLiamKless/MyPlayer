import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import 'fontsource-roboto';
import TopAlbums from './TopAlbums'
import TopSongs from './TopSongs'
import TopPlaylists from './TopPlaylists'
import TopArtists from './TopArtists'
import { mixpanelTrackUrlChanged } from '../../../analytics/analyticsManager'

function Home({ setSongToPlay, user }) {

  const location = useLocation();
  
  useEffect(() => {
    mixpanelTrackUrlChanged(location.pathname)
  },[])
  
  return (
  <div className="App">
    <header className="App-header">
        <TopSongs setSongToPlay={setSongToPlay} user={user}></TopSongs>
        <TopAlbums></TopAlbums>
        <TopArtists></TopArtists>
        <TopPlaylists></TopPlaylists>
    </header>
  </div>
  );
}

export default Home;
