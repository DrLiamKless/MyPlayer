import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import 'fontsource-roboto';
import Home from './components/pages/Home/Home';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Admin from './components/pages/Admin/Admin';
import Allsongs from './components/pages/Allsongs';
import Artists from './components/pages/Artists';
import Allplaylists from './components/pages/Allplaylists';
import SingleSong from './components/pages/SingleSong';
import SinglePlaylist from './components/pages/SinglePlaylist';
import Playlist from './components/Playlist';



function App() {
  return (
    <div>
      <Topbar></Topbar>
      <Router>
      <Sidebar></Sidebar>
      <Switch>
        <Route path={"/"} exact component={Home}/>
        <Route path="/Allsongs" exact component={Allsongs}/>
        <Route path="/Admin" exact component={Admin}/>
        <Route path="/Allartists" exact component={Artists}/>
        <Route path="/Allplaylists" exact component={Allplaylists}/>
        <Route path="/singlePlaylist/:id" exact component={SinglePlaylist}/>
        <Route path="/singleSong/:id" exact component={SingleSong}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
