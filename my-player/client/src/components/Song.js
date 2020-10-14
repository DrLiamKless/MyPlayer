import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { brown } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import { read, create } from '../wrappers/ajax';
import likeFunction from "../wrappers/likeFunction"
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Select from '@material-ui/core/Select';
import {useForm} from 'react-hook-form';
import Loader from './Loader';








const useStyles = makeStyles((theme) => ({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    card: {
      backgroundColor: brown[500],
    },
  }));
 

function Song({ song, setSongToPlay, setLikeState, likeState}) {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [playlists, setPlaylists] = useState([]);
    const {register: addToPlaylist, handleSubmit: handleAddToPlaylist} = useForm()


    useEffect(() => {
      read("api/v1/playlists").then((res) => {
        setPlaylists(res)
      });
    }, [open]);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const onAddToPlaylist = data => {
      create("api/v1/playlists/addSong", data);
      handleClose()
    } 

  return (
    song ?
    <div className={"card"}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt="artist img" src={song.Artists[0] && song.Artists[0].artistCoverImg}>
            </Avatar>
          }
          title={song.songName}
          disableTypography={false}
          // subheader="song's artist"
        ></CardHeader>
        <CardContent className={"logo-container"}>
        <Link to={`/song/${song.id}?artist=${song.artistId}`}>
        {<img src={"https://assets.onlinelabels.com/images/clip-art/BenBois/BenBois_Vinyl_records.png"} className="song-logo" alt="logo" />}
        </Link>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip 
          title={"add/remove from favorites"} placement={"bottom"}
          TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
            <IconButton
              aria-label="Like"
              onClick={()=>{likeFunction(song); setLikeState(!likeState)}}>
              <FavoriteIcon 
              color={song.Interactions[0] && song.Interactions[0].isLiked === true ? 'secondary' : 'inherit'}>
              </FavoriteIcon>
            </IconButton>
          </Tooltip>
          <Tooltip 
          title="play" placement={"bottom"}
          TransitionProps={{ timeout: 600 }}>
            <IconButton aria-label="play" onClick={()=>{setSongToPlay(song)}}>
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
          <Tooltip 
          title="add to playlist" placement={"bottom"}
          TransitionProps={{ timeout: 600 }}>
            <IconButton aria-label="add" variant="outlined" onClick={handleClickOpen}>
              <AddIcon/>
            </IconButton>
          </Tooltip>
          <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add to Playlist</DialogTitle>
        <DialogContent>
        </DialogContent>
          <form  
            noValidate onSubmit={handleAddToPlaylist(onAddToPlaylist)}>
            <div>
              <Select fullWidth native inputRef={addToPlaylist} name="songId" variant="outlined">
              <option value={song.id}>{song.songName}</option>
              </Select>
              <Select fullWidth placeholder="playlists" native inputRef={addToPlaylist} name="playlistId" variant="outlined">
              {playlists.map(playlist => (<option key={playlist.playlistName} value={playlist.id}>{playlist.playlistName}</option>))}
              </Select>
            </div>
          <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{marginBottom:"5px"}}
          inputRef={addToPlaylist}>
            Add
          </Button>
          <Button onClick={handleClose}
          color="primary"
          fullWidth
          variant="contained"
          >
            Cancel
          </Button>
          </form>
        <DialogActions>
        </DialogActions>
      </Dialog>
        </CardActions>
      </Card>
    </div>
    : <Loader/>
  )
}

export default Song;
