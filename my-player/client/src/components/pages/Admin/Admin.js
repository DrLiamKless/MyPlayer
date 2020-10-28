import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { read } from "../../../wrappers/ajax"
import AddSong from './AddSong';
import AddArtist from './AddArtist';
import AddAlbum from './AddAlbum';
import { mixpanelTrackUrlChanged } from '../../../analytics/analyticsManager'

function Admin() {
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([]);

  const location = useLocation();
  
  useEffect(() => {
    mixpanelTrackUrlChanged(location.pathname)
  },[])

  useEffect(() => {
    read("api/v1/artists").then((res) => {
      setArtists(res)
    });
  }, []);

  useEffect(() => {
    read("api/v1/albums").then((res) => {
      setAlbums(res)
    });
  }, []);
  
  return (

    <div className="App" >
    <header className="App-header">
      <AddSong albums={albums} artists={artists}></AddSong>
      <AddAlbum artists={artists}></AddAlbum>
      <AddArtist></AddArtist>
    </header>
  </div>
  );
}

export default Admin;
