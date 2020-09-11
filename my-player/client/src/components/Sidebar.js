import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'fontsource-roboto';
import MenuIcon from '@material-ui/icons/Menu';
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
            <Menu iconShape="square">
            <br></br>
            <br></br>
            <br></br>
            <MenuItem>
                Home
            <Link to="/Home" />
            </MenuItem>
            <MenuItem>
                All songs 
            <Link to="/Allsongs" />
            </MenuItem>
            <MenuItem>
                All Artists 
            <Link to="/AllArtists"/>
            </MenuItem>
            <MenuItem>
                All Playlists 
            <Link to="/Allplaylists"/>
            </MenuItem>
            <SubMenu title="My user">
                <MenuItem>settings</MenuItem>
                <MenuItem>Admin <Link to="/Admin"/></MenuItem>
            </SubMenu>
            </Menu>
        </ProSidebar>
    </div>
  );
}

export default Sidebar;
