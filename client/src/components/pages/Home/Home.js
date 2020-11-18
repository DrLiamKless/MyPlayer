import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import 'fontsource-roboto';
import TopAlbums from './TopAlbums'
import TopSongs from './TopSongs'
import TopPlaylists from './TopPlaylists'
import TopArtists from './TopArtists'
import { mixpanelTrackUrlChanged } from '../../../analytics/analyticsManager'
import { User } from '../../../contexts/userContext';
import { read } from '../../../wrappers/ajax';

function Home({ setSongToPlay }) {

  const location = useLocation();
  const user = useContext(User);

  const [topAlbums, setTopAlbums] = useState();
  const [topArtists, setTopArtists] = useState();
  const [topPlaylists, setTopPlaylists] = useState();
  const [topSongs, setTopSongs] = useState();

  
  useEffect(() => {
    mixpanelTrackUrlChanged(location.pathname);
  },[]);

  const fetchAllTop = () => {
    read(`/api/v1/albums/top/${user.id}`).then((res) => {
      setTopAlbums(res);
    });
    read(`/api/v1/artists/top/${user.id}`).then((res) => {
      setTopArtists(res);
    });
    read(`/api/v1/playlists/top/${user.id}`).then((res) => {
      setTopPlaylists(res);
    });
    read(`/api/v1/songs/top/${user.id}`).then((res) => {
      setTopSongs(res);
    });
  }

  useEffect(() => {
    fetchAllTop();
  }, []);
  
  return (
  <div className="page">
      <TopSongs setSongToPlay={setSongToPlay} topSongs={topSongs}></TopSongs>
      <TopAlbums topAlbums={topAlbums}></TopAlbums>
      <TopArtists topArtists={topArtists}></TopArtists>
      <TopPlaylists topPlaylists={topPlaylists}></TopPlaylists>
  </div>
  );
}

export default Home;
