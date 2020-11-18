import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import 'fontsource-roboto';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import IconButton from '@material-ui/core/IconButton';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import Search from './Search'
import { User } from '../contexts/userContext';
import ErrorBoundary from './ErrorBoundary';
import BGSidebar from '../images/sidebar.jpg'


function Sidebar() {

    const [sideBarOpen, setSideBarOpen] = useState(true)
    const user = useContext(User)

    const logOut = async () => {
        try {
            Cookies.remove("accessToken")
            Cookies.remove("refreshToken")
            Cookies.remove("id")
          window.location = '/';
        } catch (error) {
          console.error(error)
        }
      }

  return (
    <div>
        <ProSidebar id={"side-bar"} collapsed={sideBarOpen}
        image={BGSidebar}
        >
            <Menu iconShape="circle">
            <br></br>
            <br></br>
            <br></br>
            <MenuItem icon={<MenuIcon/>} onClick={()=>{setSideBarOpen(!sideBarOpen)}}></MenuItem>
            <br></br>
            <br></br>
            <br></br>
            <MenuItem icon={<HomeIcon/>}>
                Home
            <Link to="/" />
            </MenuItem>
            <MenuItem icon={<AudiotrackIcon/>}>
                All songs 
            <Link to="/Allsongs" />
            </MenuItem>
            <MenuItem icon={<RecordVoiceOverIcon/>}>
                All Artists 
            <Link to="/AllArtists"/>
            </MenuItem>
            <MenuItem icon={<LibraryMusicIcon/>}>
                All Playlists 
            <Link to="/Allplaylists"/>
            </MenuItem>
            <SubMenu title="Search" icon={<SearchIcon/>}>
                <ErrorBoundary>
                <Search></Search>
                </ErrorBoundary>
            </SubMenu>
            { user.isAdmin && 
            <SubMenu title="My user" icon={<AccountCircleIcon/>}>
                <MenuItem>Admin <Link to="/Admin"/></MenuItem>
            </SubMenu>
            }
                <MenuItem icon={<ExitToAppIcon/>} onClick={logOut}>
                    log out
                </MenuItem>
            </Menu>
        </ProSidebar>
    </div>
  );
}

export default Sidebar;
