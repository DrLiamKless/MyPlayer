import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import 'fontsource-roboto';
import Home from './components/Home/Home';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Admin from './components/Admin/Admin';
import Allsongs from './components/Allsongs';
import Artists from './components/Artists';
import Allplaylists from './components/Allplaylists';
import SingleSong from './components/SingleSong';


function App() {
  return (
    <div>
      <Topbar></Topbar>
      <Router>
      <Sidebar></Sidebar>
        <Route path={"/"} exact component={Home}/>
        <Route path="/Allsongs" exact component={Allsongs}/>
        <Route path="/Admin" exact component={Admin}/>
        <Route path="/Allartists" exact component={Artists}/>
        <Route path="/Allplaylists" exact component={Allplaylists}/>
        <Route path="/singleSong/:title" exact component={SingleSong}/>
      </Router>
    </div>
  );
}

export default App;
