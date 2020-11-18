import React, { useState, useEffect, useContext } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import { useParams, Link, useLocation } from "react-router-dom";
import Album from '../Album';
import { brown } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import likeFunction from "../../wrappers/likeFunction"
import Loader from '../Loader'
import { mixpanelTrackUrlChanged, mixpanelTrackSongLiked, mixpanelTrackSongUnliked  } from '../../analytics/analyticsManager'
import { User } from '../../contexts/userContext';





const useStyles = makeStyles((theme) => ({
  root: {
    width: '139%',
    maxWidth: 360,
    backgroundColor: brown[500],
    marginLeft: "20px"
  },
}));

function SingleAlbum({ setSongToPlay }) {
  const location = useLocation();
  
  useEffect(() => {
    mixpanelTrackUrlChanged(location.pathname)
  },[])
  
  let { id } = useParams() ;
  const user = useContext(User);
  const [singleAlbum, setSingleAlbum] = useState();
  const [likeState, setLikeState] = useState(false);
  const classes = useStyles();

    useEffect(() => {
      read(`/api/v1/albums/${id}`).then((res) => {
        setSingleAlbum(res);
      });
    }, [id, likeState]);

    const handleLike = (song) => {
      likeFunction(song, user); 
      setLikeState(!likeState); 
      likeState ? 
      mixpanelTrackSongUnliked(song.songName)
      : mixpanelTrackSongLiked(song.songName);
    }
  
  return (
    singleAlbum ?
  <div className="page">
    <div className="single-page">
      <Album
        key={singleAlbum.id}
        album={singleAlbum}
        setSongToPlay={setSongToPlay}
      >
      </Album>
      <div className="suggested-songs">
        <List className={classes.root}
          subheader={
            <ListSubheader component="p">
              more songs from {singleAlbum.albumName} 
            </ListSubheader>
          }>
          {singleAlbum.Songs.map((song) => (
            <ListItem key={song.id} role={undefined} dense button>
              <Link 
              to={`/song/${song.id}?album=${song.albumId}`}
              style={{color: 'black'}}>
                <ListItemText primary={`${song.songName}`} />
              </Link>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="like"
                  onClick={() => {handleLike(song)}}>
                  <FavoriteIcon  color={song.Interactions[0] && song.Interactions[0].isLiked === true ? 'secondary' : 'inherit'}>
                  </FavoriteIcon>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  </div>
  : <Loader/>
  );
}

export default SingleAlbum;
