import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import { makeStyles } from '@material-ui/core/styles';
import 'fontsource-roboto';
import Artist from '../Artist'
import { useParams, Link } from "react-router-dom";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import { brown } from '@material-ui/core/colors';
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
}))

function SinglePlaylist({ props, singleSong }) {
  let { id } = useParams() 
  const [singleArtist, setSingleArtist] = useState([])
  const [songsList, setSongsList] = useState([]);
  const [likeState, setLikeState] = useState(false); 
  const classes = useStyles();


    useEffect(() => {
      read(`/artists/songsList/${id}`).then((res) => {
        setSongsList(res)
      });
    }, [id, likeState]);

    useEffect(() => {
      read(`/artists/artist/${id}`).then((res) => {
        setSingleArtist(res[0])
      });
    },[likeState]);
  
    return (
        <div className="App">
          <header className="single-song-page">
            <Artist
              key={singleArtist.playlist_id}
              artist={singleArtist}
            >
            </Artist>
            <div className="suggested-songs">
              <List className={classes.root}
                subheader={
                  <ListSubheader component="div">
                    more songs of {singleArtist.artist_name}
                  </ListSubheader>
                }>
                {songsList.map((song) => (
                  <ListItem key={song.song_id} role={undefined} dense>
                      <Link 
                      to={`/song/${song.song_id}?artist=${singleArtist.artist_id}`}
                      style={{color: 'black'}}>
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

export default SinglePlaylist;
