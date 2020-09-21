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

    const [searchInput, setSearchInput] = useState()
    const [serachOutputs, setSearchOutputs] = useState([])

    useEffect(() => {
        if(searchInput) {
            read(`/songs/search/${searchInput}`).then((res) => {
            setSearchOutputs(res)
            });
         }
    }, [searchInput]);

  return (  
            <div>
                <TextField onChange={(e)=>setSearchInput(e.target.value)}></TextField>
                <IconButton aria-label="delete">
                <SearchIcon></SearchIcon>
                </IconButton>
                <div>
                    {searchInput && serachOutputs.map(song =>(
                        <div key={song.song_name}  style={{width: "max-content", fontSize: "12px"}}>
                                <Tooltip 
                                    placement={"bottom"}
                                    TransitionComponent={Fade}
                                       TransitionProps={{ timeout: 600 }}
                                       title={`by ${song.artist_name}`}>
                                    <span>{song.song_name}</span>
                                </Tooltip>
                                        <IconButton>
                                    <Link to={`/song/${song.song_id}?artist=${song.artist_id}`}>
                                            <Avatar alt="artist img" src={song.artist_cover_img}/>                                    </Link>
                                        </IconButton>

                        </div> 
                    ))}
                </div>
            </div>
  );
}

export default Search;
