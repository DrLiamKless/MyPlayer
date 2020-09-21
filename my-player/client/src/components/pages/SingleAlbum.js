import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import { useParams, Link } from "react-router-dom";
import Album from '../Album';
import { brown } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import likeFunction from "../../wrappers/likeFunction"




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
  const [singleAlbum, setSingleAlbum] = useState([]);
  const [songsList, setSongsList] = useState([]);
  const [likeState, setLikeState] = useState(false)
  const classes = useStyles();

    useEffect(() => {
      read(`/albums/album/${id}`).then((res) => {
        setSingleAlbum(res[0])
      });
    }, [id, likeState]);

    useEffect(() => {
      read(`/albums/songsList/${id}`).then((res) => {
        setSongsList(res)
      }); 
    }, [likeState]);
  
  return (
  <div className="App">
    <header className="single-song-page">
            <Album
              key={singleAlbum.album_id}
              album={singleAlbum}
              setSongToPlay={setSongToPlay}
            >
            </Album>
            <div className="suggested-songs">
              <List className={classes.root}
                subheader={
                  <ListSubheader component="div">
                    more songs from {singleAlbum.album_name} 
                  </ListSubheader>
                }>
                {songsList.map((song) => (
                  <ListItem key={song.song_id} role={undefined} dense button>
                    <Link to={`/song/${song.song_id}?album=${song.album_id}`}>
                      <ListItemText primary={`${song.song_name}`} />
                    </Link>
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="like"
                        onClick={()=>{likeFunction(song); setLikeState(!likeState)}}>
                        <FavoriteIcon color={song.is_liked == 1 ? 'secondary' : 'inherit'}></FavoriteIcon>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              </div>
    </header>
  </div>
  );
}

export default SingleAlbum;
