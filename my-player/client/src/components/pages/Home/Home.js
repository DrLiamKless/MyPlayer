import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import TopAlbums from './TopAlbums'
import TopSongs from './TopSongs'
import TopPlaylists from './TopPlaylists'

function Home() {
  
  return (
  <div className="App">
    <header className="App-header">
        <TopSongs></TopSongs>
        <TopAlbums></TopAlbums>
        <TopPlaylists></TopPlaylists>
    </header>
  </div>
  );
}

export default Home;
