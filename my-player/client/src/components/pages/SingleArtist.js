import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import { makeStyles } from '@material-ui/core/styles';
import 'fontsource-roboto';
import Artist from '../Artist'
import { useParams, Link, useLocation } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { brown } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import likeFunction from "../../wrappers/likeFunction"
import Loader from '../Loader'
import { mixpanelTrackUrlChanged, mixpanelTrackSongLiked, mixpanelTrackSongUnliked  } from '../../analytics/analyticsManager'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: brown[500],
    marginLeft: "20px"
  },
}))

function SinglePlaylist({ props, singleSong }) {
  let { id } = useParams() 
  const [singleArtist, setSingleArtist] = useState({})
  const [likeState, setLikeState] = useState(false); 
  const classes = useStyles();
  const location = useLocation();
  
  useEffect(() => {
    mixpanelTrackUrlChanged(location.pathname)
  },[])


    useEffect(() => {
      read(`/api/v1/artists/${id}`).then((res) => {
        setSingleArtist(res)
      });
    },[likeState]);

    const handleLike = (song) => {
      likeFunction(song); 
      setLikeState(!likeState); 
      likeState ? 
      mixpanelTrackSongUnliked(song.songName)
      : mixpanelTrackSongLiked(song.songName) 
    }
  
    return (
      singleArtist.artistName ? 
        <div className="App">
          <header className="single-song-page">
            <Artist
              key={singleArtist.id}
              artist={singleArtist}
            >
            </Artist>
            <div className="suggested-songs">
              <List className={classes.root}
                subheader={
                  <ListSubheader component="div">
                    more songs of {singleArtist.artistName}
                  </ListSubheader>
                }>
                {singleArtist.Songs.map((song) => {
                  return <ListItem key={song.id} role={undefined} dense>
                      <Link 
                      to={`/song/${song.id}?artist=${singleArtist.id}`}
                      style={{color: 'black'}}>
                    <ListItemText primary={`${song.songName}`} />
                    </Link>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="like"
                        onClick={()=> {handleLike(song)}}>
                        <FavoriteIcon  color={song.Interactions[0] && song.Interactions[0].isLiked === true ? 'secondary' : 'inherit'}>
                        </FavoriteIcon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
              })}
              </List>
            </div>
          </header>
        </div>
        : <Loader/>
        );
}

export default SinglePlaylist;
