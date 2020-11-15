import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import Cookies from 'js-cookie';
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
import NoMatch from './components/pages/NoMatch';
import Login from './components/pages/Identification/Login';
import Signup from './components/pages/Identification/Signup';
import { read } from "./wrappers/ajax"
import { mixpanelTrackLoggedIn, mixpanelTrackEnteredLoginPage } from "./analytics/analyticsManager";




function App() {

  const [songToPlay, setSongToPlay] = useState();
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {// auth
    (async () => {
      if (Cookies.get("accessToken")) {
        try {
          const data = await read("/api/v1/auth/validateToken");
          setLogged(data);
          const userId = Cookies.get('id');
          const userLogged = await read(`api/v1/users/id/${userId}`);
          setUser(userLogged);
          setLoading(false);
          mixpanelTrackLoggedIn()
        } catch (e) {
          setLoading(false)
        }
      } else {
        setLoading(false);
        mixpanelTrackEnteredLoginPage()
        console.log('cant get token')
      }
    })();
  }, []);

  return (
    <>
      {
        !loading ?
          !logged ?
          <Router>
          <Switch>
          <Route path={'/'} exact> <Login></Login></Route>
          <Route path={'/signUp'} exact> <Signup/> </Route>
          </Switch> 
          </Router>
          : 
          <div>
          <Router>
            <Topbar></Topbar>
            <Sidebar></Sidebar>
            <Player songToPlay={songToPlay} user={user}></Player>
              <Switch>
                <Route path={"/"} exact> <Home setSongToPlay={setSongToPlay} user={user}> </Home> </Route>
                <Route path="/Allsongs"> <Allsongs setSongToPlay={setSongToPlay}> </Allsongs> </Route>
                <Route path="/Admin" exact> <Admin/> </Route>
                <Route path="/Allartists" exact> <AllArtists/> </Route>
                <Route path="/Allplaylists" exact> <Allplaylists/> </Route>
                <Route path="/playlist/:id" exact> <SinglePlaylist/> </Route>
                <Route path="/song/:id" exact> <SingleSong setSongToPlay={setSongToPlay}></SingleSong> </Route>
                <Route path="/album/:id" exact> <SingleAlbum setSongToPlay={setSongToPlay}></SingleAlbum> </Route>
                <Route path="/artist/:id" exact> <SingleArtist setSongToPlay={setSongToPlay}></SingleArtist> </Route>
                <Route> <NoMatch setSongToPlay={setSongToPlay}></NoMatch></Route>
              </Switch>
            </Router>
          </div>
        : <div>loading...</div>
      }
    </>
  );
}

export default App;
