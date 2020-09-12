import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import AddSong from './AddSong';
import AddArtist from './AddArtist';
import AddAlbum from './AddAlbum';

function Admin() {
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    read("/artists").then((res) => {
      setArtists(res)
    });
  }, []);

  useEffect(() => {
    read("/albums").then((res) => {
      setAlbums(res)
    });
  }, []);
  
  return (
    <div className="App" style={{marginLeft: "10vw"}}>
    <header className="App-header">
      <AddSong albums={albums} artists={artists}></AddSong>
      <AddAlbum artists={artists}></AddAlbum>
      <AddArtist></AddArtist>
    </header>
  </div>
  );
}

export default Admin;
