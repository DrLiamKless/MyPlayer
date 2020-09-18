import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Song from '../Song'
import { useParams, useLocation, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { brown } from '@material-ui/core/colors';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: brown[500],
    marginLeft: "20px"
  },
  paper: {
    height: "100%",
    width: "400px",
    backgroundColor: brown[500],
    marginRight: "20px",
    textAlign: "center",
  }
}));


function SingleSong({ setSongToPlay }) {
  
  let { id } = useParams(); 
  const [singleSongObject, setSingleSongObject] = useState("");
  const [songsFromQuery, setSongsFromQuery] = useState([1,2,3])
  const classes = useStyles();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery()
  const artistQuery = query.get("artist");
  const albumQuery = query.get('album');
  const playlistQuery = query.get("playlist");
  const queryKey = albumQuery !== null ? `album` : artistQuery !== null ? 'artist' : 'playlist';
  const queryValue = albumQuery !== null ? albumQuery : artistQuery !== null ? artistQuery : playlistQuery;

    useEffect(() => {
      read(`/songs/song/${id}`).then((res) => {
        setSingleSongObject(res[0])
      });
    }, [id]);

    useEffect(() => {
        read(`/${queryKey}s/songsList/${queryValue}`).then((res) => {
          setSongsFromQuery(res);
        })
      }, []);


  
  return (
  <div className="App">
    <div className="single-song-page">
            <Song
              key={singleSongObject.song_id}
              song={singleSongObject}
              setSongToPlay={setSongToPlay}
            >
            </Song>
            <div className="suggested-songs">
              <List className={classes.root}
                subheader={
                  <ListSubheader component="div">
                    related songs from this
                    {' ' + queryKey}
                  </ListSubheader>
                }>
                {songsFromQuery.map((song) => (
                  <ListItem key={song.song_id} role={undefined} dense>
                    <Link to={`/song/${song.song_id}?${queryKey}=${queryValue}`}>
                      <ListItemText primary={`${song.song_name}`} />
                    </Link>
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="comments">
                        <FavoriteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </div>
    </div>
  </div>
  );
}

export default SingleSong;
