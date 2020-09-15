import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import NewestSongs from './NewestSongs'
import TopSongs from './TopSongs'
import TopPlaylists from './TopPlaylists'

function Home() {
  
  return (
  <div className="App">
    <header className="App-header">
        <TopSongs></TopSongs>
        <NewestSongs></NewestSongs>
        <TopPlaylists></TopPlaylists>
    </header>
  </div>
  );
}

export default Home;