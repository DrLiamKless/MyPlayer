import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'fontsource-roboto';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';


function Sidebar() {

    const [sideBarOpen, setSideBarOpen] = useState(false)

  return (
    <div>
        <MenuIcon id={"toggle-btn"} onClick={()=>{setSideBarOpen(!sideBarOpen)}}></MenuIcon>
        <ProSidebar id={"side-bar"} collapsed={sideBarOpen}
        image={"https://media.pri.org/s3fs-public/story/images/Music%20Listening.jpg"}
        >
            <Menu iconShape="circle">
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
            <SubMenu title="My user" icon={<AccountCircleIcon/>}>
                <MenuItem>settings</MenuItem>
                <MenuItem>Admin <Link to="/Admin"/></MenuItem>
            </SubMenu>
            </Menu>
        </ProSidebar>
    </div>
  );
}

export default Sidebar;
