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
import useDebounce from '../hooks/debounce'


function Search() {

    const [searchInput, setSearchInput] = useState();
    const [searchSongsOutputs, setSearchSongsOutputs] = useState([]);
    const [searchArtistsOutputs, setSearchArtistsOutputs] = useState([]);
    const [searchAlbumsOutputs, setSearchAlbumsOutputs] = useState([]);
    const [isSearching, setIsSearching] = useState(false)
    const debouncedSearchInput = useDebounce(searchInput, 500);

    useEffect(() => {
        if(debouncedSearchInput) {
            setIsSearching(true);
            try {
                read(`api/v1/search/songs/${searchInput}`).then((res) => {
                    setSearchSongsOutputs(() => {
                        if (res.name === "ResponseError") {
                            return false
                        }
                        return res
                    });
                }).catch(err => {
                    setSearchSongsOutputs(false)
                })
                read(`api/v1/search/artists/${searchInput}`).then((res) => {
                    setSearchArtistsOutputs(() => {
                        if (res.name === "ResponseError") {
                            return false
                        }
                        return res
                    });
                }).catch(err => {
                    setSearchSongsOutputs(false)
                })
                read(`api/v1/search/albums/${searchInput}`).then((res) => {
                    setSearchAlbumsOutputs(() => {
                        if (res.name === "ResponseError") {
                            return false
                        }
                        return res
                    });
                    setIsSearching(false);
                }).catch(err => {
                    setSearchSongsOutputs(false)
                })
            } catch (err) {
                console.error(err);
            } 
         }
    }, [debouncedSearchInput]);

    useEffect(() => {
        setSearchSongsOutputs([])
        setSearchArtistsOutputs([])
        setSearchAlbumsOutputs([])
    },[searchInput])

  return (  
        <div>
            <TextField onChange={(e)=>setSearchInput(e.target.value)}></TextField>
            <IconButton aria-label="delete">
            <SearchIcon></SearchIcon>
            </IconButton>
            <div style={{maxHeight:"200px"}}>
                {searchSongsOutputs.length > 0 && <h5>songs:</h5>}
                {searchSongsOutputs && searchSongsOutputs.map(song =>(
                        <div key={song.id}  style={{width: "max-content", fontSize: "12px"}}>
                                <IconButton>
                            <Link to={`/song/${song.id}?artist=${song.Artists[0]?.id}`}>
                                    <Avatar alt="artist img" src={song.Artists[0]?.artistCoverImg}/>                                    </Link>
                                </IconButton>
                            <Tooltip 
                                placement={"bottom"}
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 600 }}
                                title={`by ${song.Artists[0]?.artistName}`}>
                                <span>{song.songName}</span>
                            </Tooltip>
                        </div> 
                    ))}
                {searchArtistsOutputs.length > 0 && <h5>artists:</h5>}
                    {searchArtistsOutputs && searchArtistsOutputs.map(artist =>(
                        <div key={artist.id}  style={{width: "max-content", fontSize: "12px"}}>
                                <IconButton>
                            <Link to={`/artist/${artist.id}`}>
                                    <Avatar alt="artist img" src={artist.artistCoverImg}/>                                    </Link>
                                </IconButton>
                                <span>{artist.artistName}</span>
                        </div> 
                    ))}
                {searchAlbumsOutputs.length > 0 && <h5>albums:</h5>}
                    { searchAlbumsOutputs && searchAlbumsOutputs.map(album =>(
                        <div key={album.id}  style={{width: "max-content", fontSize: "12px"}}>
                                <IconButton>
                            <Link to={`/album/${album.id}`}>
                                    <Avatar alt="artist img" src={album.albumCoverImg}/>                                    </Link>
                                </IconButton>
                            <Tooltip 
                                placement={"bottom"}
                                TransitionComponent={Fade}
                                TransitionProps={{ timeout: 600 }}
                                title={album.Artists[0] && `by ${album.Artists[0]?.artistName}`}>
                                <span>{album.albumName}</span>
                            </Tooltip>
                        </div> 
                    ))}
            </div>
        </div>
  );
}

export default Search;
