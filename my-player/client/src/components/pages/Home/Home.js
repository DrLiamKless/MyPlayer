import React from 'react';
import 'fontsource-roboto';
import TopAlbums from './TopAlbums'
import TopSongs from './TopSongs'
import TopPlaylists from './TopPlaylists'
import TopArtists from './TopArtists'

function Home({ setSongToPlay, user }) {
  
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
