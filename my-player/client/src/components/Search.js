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
            read(`/songs/search/${searchInput}`).then((res) => {
            setSearchSongsOutputs(res)
            });
            read(`/artists/search/${searchInput}`).then((res) => {
                setSearchArtistsOutputs(res)
            });
            read(`/albums/search/${searchInput}`).then((res) => {
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
                    {searchArtistsOutputs.length > 0 && <h5>artists:</h5>}
                        {searchInput && searchArtistsOutputs.map(artist =>(
                            <div key={artist.song_name}  style={{width: "max-content", fontSize: "12px"}}>
                                    <IconButton>
                                <Link to={`/artist/${artist.song_id}`}>
                                        <Avatar alt="artist img" src={artist.artist_cover_img}/>                                    </Link>
                                    </IconButton>
                                    <span>{artist.artist_name}</span>
                            </div> 
                        ))}
                    {searchAlbumsOutputs.length > 0 && <h5>albums:</h5>}
                        { searchInput && searchAlbumsOutputs.map(album =>(
                            <div key={album.song_name}  style={{width: "max-content", fontSize: "12px"}}>
                                <Tooltip 
                                    placement={"bottom"}
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                    title={`by ${album.artist_name}`}>
                                    <span>{album.album_name}</span>
                                </Tooltip>
                                    <IconButton>
                                <Link to={`/album/${album.song_id}`}>
                                        <Avatar alt="artist img" src={album.album_cover_img}/>                                    </Link>
                                    </IconButton>
                            </div> 
                        ))}
                </div>
            </div>
  );
}

export default Search;
