import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import 'fontsource-roboto';
import Home from './components/Allsongs';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Admin from './components/Admin';
import Allsongs from './components/Allsongs';
import Artists from './components/Artists';
import Allplaylists from './components/Allplaylists';


function App() {
  return (
    <div>
      <Topbar></Topbar>
      <Router>
      <Sidebar></Sidebar>
        <Route path="/Allsongs" exact component={Allsongs}/>
        <Route path="/Admin" exact component={Admin}/>
        <Route path="/Allartists" exact component={Artists}/>
        <Route path="/Allplaylists" exact component={Allplaylists}/>
      </Router>
    </div>
  );
}

export default App;
