import React, { useState, useEffect, useContext } from 'react';
import { read } from "../../wrappers/ajax"
import 'fontsource-roboto';
import Song from '../Song'
import { useParams, useLocation, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import { brown } from '@material-ui/core/colors';
import Fade from '@material-ui/core/Fade';
import Tooltip from '@material-ui/core/Tooltip';
import likeFunction from "../../wrappers/likeFunction"
import Loader from '../Loader'
import { mixpanelTrackUrlChanged, mixpanelTrackSongLiked, mixpanelTrackSongUnliked  } from '../../analytics/analyticsManager'
import { User } from '../../contexts/userContext';





const useStyles = makeStyles((theme) => ({
  root: {
    width: '130%',
    backgroundColor: brown[500],
    marginLeft: "20px"
  },
  paper: {
    height: "100%",
    width: "100%",
    backgroundColor: brown[500],
    marginRight: "20px",
    textAlign: "center",
  }
}));


function SingleSong({ setSongToPlay }) {
  
  let { id } = useParams(); 
  const [singleSongObject, setSingleSongObject] = useState();
  const [songsFromQuery, setSongsFromQuery] = useState();
  const [likeState, setLikeState] = useState(false);
  const [singlePlaylistObject, setSinglePlaylistObject] = useState()
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    mixpanelTrackUrlChanged(location.pathname)
  },[])

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery()
  const user = useContext(User);
  const artistQuery = query.get("artist");
  const albumQuery = query.get('album');
  const playlistQuery = query.get("playlist");
  const queryKey = albumQuery !== null ? `album` : artistQuery !== null ? 'artist' : 'playlist';
  const queryValue = albumQuery !== null ? albumQuery : artistQuery !== null ? artistQuery : playlistQuery;

    useEffect(() => {
      read(`/api/v1/songs/${id}`).then((res) => {
        setSingleSongObject(res)
      });
    }, [id, likeState]);

    useEffect(() => {
        read(`/api/v1/${queryKey}s/${queryValue}`).then((res) => {
          setSongsFromQuery(res);
        })
      }, [likeState]);

      const handleLike = (song) => {
        likeFunction(song, user); 
        setLikeState(!likeState); 
        likeState ? 
        mixpanelTrackSongUnliked(song.songName)
        : mixpanelTrackSongLiked(song.songName) 
      }
  
  return (
  singleSongObject && songsFromQuery ?
  <div className="page">
    <div className="single-page">
      <Song
      key={singleSongObject.song_id}
      song={singleSongObject}
      setSongToPlay={setSongToPlay}
      likeState={likeState}
      setLikeState={setLikeState}>
      </Song>
      <div className="suggested-songs">
        <List className={classes.root}
          subheader={
                <Link to={`/${queryKey}/${queryValue}`}>
            <ListSubheader component="p">
              {  songsFromQuery.Songs.length > 1 ? <h5>related songs from 
                {albumQuery ? 
                ' ' + songsFromQuery.albumName :
                artistQuery ? 
                ' ' + songsFromQuery.artistName :
                playlistQuery &&
                ' ' + songsFromQuery.playlistName + ' playlist'}</h5>
                : <h5>this is the only song from this {queryKey}</h5>}
            </ListSubheader>
            </Link>
          }>
          {songsFromQuery.Songs.filter(song => song.songName !== singleSongObject.songName).map((song, i) => (
            <ListItem key={i} role={undefined} dense>
              <Link 
              to={`/song/${song.id}?${queryKey}=${queryValue}`}
              style={{color: 'black'}}>
                <ListItemText primary={`${song.songName}`} />
              </Link>
              <ListItemSecondaryAction>
                <Tooltip 
                  title={"add/remove from favorites"} placement={"right"}
                  TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
                  <IconButton
                    edge="end"
                    aria-label="like"
                    onClick={() => {handleLike(song)}}>
                    <FavoriteIcon  color={song.Interactions[0] && song.Interactions[0].isLiked === true ? 'secondary' : 'inherit'}>
                    </FavoriteIcon>
                  </IconButton>
                </Tooltip>
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

export default SingleSong;
