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

    const [searchInput, setSearchInput] = useState();
    const [searchSongsOutputs, setSearchSongsOutputs] = useState([]);
    const [searchArtistsOutputs, setSearchArtistsOutputs] = useState([]);
    const [searchAlbumsOutputs, setSearchAlbumsOutputs] = useState([]);



    useEffect(() => {
        if(searchInput) {
            read(`api/v1/songs/?songName=${searchInput}`).then((res) => {
            setSearchSongsOutputs(res)
            });
            read(`api/v1/artists/?artistName=${searchInput}`).then((res) => {
                setSearchArtistsOutputs(res)
            });
            read(`api/v1/albums/?albumName=${searchInput}`).then((res) => {
                setSearchAlbumsOutputs(res)
            });
         }
    }, [searchInput]);

  return (  
            <div>
                <TextField onChange={(e)=>setSearchInput(e.target.value)}></TextField>
                <IconButton aria-label="delete">
                <SearchIcon></SearchIcon>
                </IconButton>
                <div style={{maxHeight:"200px"}}>
                    {searchSongsOutputs.length > 0 && <h5>songs:</h5>}
                    {searchInput && searchSongsOutputs.map(song =>(
                            <div key={song.id}  style={{width: "max-content", fontSize: "12px"}}>
                                <Tooltip 
                                    placement={"bottom"}
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={`by ${song.Artists[0].artistName}`}>
                                    <span>{song.songName}</span>
                                </Tooltip>
                                    <IconButton>
                                <Link to={`/song/${song.id}?artist=${song.Artists[0].id}`}>
                                        <Avatar alt="artist img" src={song.Artists[0].artistCoverImg}/>                                    </Link>
                                    </IconButton>
                            </div> 
                        ))}
                    {searchArtistsOutputs.length > 0 && <h5>artists:</h5>}
                        {searchInput && searchArtistsOutputs.map(artist =>(
                            <div key={artist.id}  style={{width: "max-content", fontSize: "12px"}}>
                                    <IconButton>
                                <Link to={`/artist/${artist.id}`}>
                                        <Avatar alt="artist img" src={artist.artistCoverImg}/>                                    </Link>
                                    </IconButton>
                                    <span>{artist.artistName}</span>
                            </div> 
                        ))}
                    {searchAlbumsOutputs.length > 0 && <h5>albums:</h5>}
                        { searchInput && searchAlbumsOutputs.map(album =>(
                            <div key={album.id}  style={{width: "max-content", fontSize: "12px"}}>
                                <Tooltip 
                                    placement={"bottom"}
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={album.Artists[0] && `by ${album.Artists[0].artistName}`}>
                                    <span>{album.albumName}</span>
                                </Tooltip>
                                    <IconButton>
                                <Link to={`/album/${album.id}`}>
                                        <Avatar alt="artist img" src={album.albumCoverImg}/>                                    </Link>
                                    </IconButton>
                            </div> 
                        ))}
                </div>
            </div>
  );
}

export default Search;
