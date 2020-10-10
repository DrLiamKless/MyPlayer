import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import { useParams, Link } from "react-router-dom";
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





const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: brown[500],
    marginLeft: "20px"
  },
}));

function SingleAlbum({ setSongToPlay }) {
  
  let { id } = useParams() 
  const [singleAlbum, setSingleAlbum] = useState();
  const [likeState, setLikeState] = useState(false)
  const classes = useStyles();

    useEffect(() => {
      read(`api/v1/albums/${id}`).then((res) => {
        setSingleAlbum(res)
      });
    }, [id, likeState]);
  
  return (
    singleAlbum ?
  <div className="App">
    <header className="single-song-page">
            <Album
              key={singleAlbum.id}
              album={singleAlbum}
              setSongToPlay={setSongToPlay}
            >
            </Album>
            <div className="suggested-songs">
              <List className={classes.root}
                subheader={
                  <ListSubheader component="div">
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
                        onClick={()=>{likeFunction(song); setLikeState(!likeState)}}>
                        <FavoriteIcon  color={song.Interactions[0] && song.Interactions[0].isLiked === true ? 'secondary' : 'inherit'}>
                        </FavoriteIcon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              </div>
    </header>
  </div>
  : <Loader/>
  );
}

export default SingleAlbum;
