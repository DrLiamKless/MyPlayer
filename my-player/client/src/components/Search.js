import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'fontsource-roboto';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import 'react-pro-sidebar/dist/css/styles.css';
import { read } from '../wrappers/ajax';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Fade from '@material-ui/core/Fade';





function Search() {

    const [searchInput, setSearchInput] = useState([])
    const [serachOutputs, setSearchOutputs] = useState([])

    useEffect(() => {
        read(`/song/${searchInput}`).then((res) => {
        setSearchOutputs(res)
        });
      }, [searchInput]);

  return (  
            <div>
                <TextField onChange={(e)=>setSearchInput(e.target.value)}></TextField>
                <IconButton aria-label="delete">
                <SearchIcon></SearchIcon>
                </IconButton>
                <div className="search-ouput-container">
                    {serachOutputs.map(song =>(
                        <div key={song.title} className="search-output" style={{width: "max-content"}}>
                                <Tooltip 
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={`by ${song.name}`}>
                                    <span>{song.title}</span>
                                </Tooltip>
                                <IconButton aria-label="delete">
                                    <Avatar alt="artist img" src={song.cover_img}/>
                                    <Link to={`/SingleSong/${song.title}`}/>
                                </IconButton>
                        </div> 
                    ))}
                </div>
            </div>
  );
}

export default Search;
