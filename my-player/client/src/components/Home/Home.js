import React, { useState, useEffect } from 'react';
import 'fontsource-roboto';
import NewestSongs from './NewestSongs'
import TopSongs from './TopSongs'
import TopPlaylists from './TopPlaylists'
import axios from 'axios'

function Home() {

    const [newestSongs, setnNewsetSongs] = useState([])

    useEffect(() => {
      axios.get("/newest_songs").then((res) => {
          setnNewsetSongs(res.data)
      });
    }, []);
  
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
