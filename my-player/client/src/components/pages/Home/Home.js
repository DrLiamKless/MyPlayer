import React from 'react';
import 'fontsource-roboto';
import TopAlbums from './TopAlbums'
import TopSongs from './TopSongs'
import TopPlaylists from './TopPlaylists'
import TopArtists from './TopArtists'
import Header from './Header'


function Home({ setSongToPlay, user }) {
  
  return (
  <div className="App">
    <header className="App-header">
        <Header user={user}></Header>
        <TopSongs setSongToPlay={setSongToPlay} user={user}></TopSongs>
        <TopAlbums></TopAlbums>
        <TopArtists></TopArtists>
        <TopPlaylists></TopPlaylists>
    </header>
  </div>
  );
}

export default Home;
