import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import 'fontsource-roboto';
import Home from './components/pages/Home/Home';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Admin from './components/pages/Admin/Admin';
import Allsongs from './components/pages/Allsongs';
import AllArtists from './components/pages/AllArtists';
import Allplaylists from './components/pages/Allplaylists';
import SingleSong from './components/pages/SingleSong';
import SingleAlbum from './components/pages/SingleAlbum';
import SinglePlaylist from './components/pages/SinglePlaylist';
import SingleArtist from './components/pages/SingleArtist';
import Player from './components/pages/Player';



function App() {

  const [songToPlay, setSongToPlay] = useState()

  return (
    <div>
      <Topbar></Topbar>
      <Router>
      <Sidebar></Sidebar>
      <Player songToPlay={songToPlay}></Player>
      <Switch>
        <Route path={"/"} exact> <Home setSongToPlay={setSongToPlay}> </Home> </Route>
        <Route path="/Allsongs"> <Allsongs setSongToPlay={setSongToPlay}> </Allsongs> </Route>
        <Route path="/Admin" exact> <Admin/> </Route>
        <Route path="/Allartists" exact> <AllArtists/> </Route>
        <Route path="/Allplaylists" exact> <Allplaylists/> </Route>
        <Route path="/singlePlaylist/:id" exact> <SinglePlaylist/> </Route>
        <Route path="/song/:id" exact> <SingleSong setSongToPlay={setSongToPlay}></SingleSong> </Route>
        <Route path="/album/:id" exact> <SingleAlbum setSongToPlay={setSongToPlay}></SingleAlbum> </Route>
        <Route path="/artist/:id" exact> <SingleArtist setSongToPlay={setSongToPlay}></SingleArtist> </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
