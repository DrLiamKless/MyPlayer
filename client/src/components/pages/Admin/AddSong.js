import React from 'react';
import { create } from "../../../wrappers/ajax"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AudiotrackIcon from '@material-ui/icons/Audiotrack';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form'
import Loader from '../../Loader'



const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));;

function AddSong({ artists, albums }) {
  const classes = useStyles();

  const {register: newSong, handleSubmit: handleNewSong} = useForm()

 

  const onSubmitSong = data => {
    create("api/v1/songs/add", data)
  } 

  
  return (
    artists & albums ?
    <div className={"home-section"} style={{backgroundColor: "rgb(99,84,65)"}}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AudiotrackIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a new song
        </Typography>
        <form  
          className={classes.form} 
          noValidate onSubmit={handleNewSong(onSubmitSong)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={newSong}
            required
            fullWidth
            label="Youtube Link (Embded Code)"
            name="youtube_link"
            autoFocus
          />
        <div className={"add-artist-container"}>
            <div>
              <InputLabel id="label">album</InputLabel>
              <Select placeholder="albums" native inputRef={newSong} name="album_id" variant="outlined">
              {albums.map(album => (<option key={album.albumName} value={album.id}>{album.albumName}</option>))}
              </Select>
            </div>
            <div className="add-artist-modal">
            </div>
        </div>
        <div className={"add-artist-container"}>
            <div>
              <InputLabel id="label">Artist</InputLabel>
              <Select placeholder="artists" native inputRef={newSong} name="artist_id" variant="outlined">
              {artists.map(artist => (<option key={artist.artistName} value={artist.id}>{artist.artistName}</option>))}
              </Select>
            </div>
            <div className="add-artist-modal">
            </div>
        </div>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={newSong}
            required
            fullWidth
            name="songeName"
            label="Name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={newSong}
            required
            fullWidth
            name="length"
            label="Length: HH:MM:SS"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={newSong}
            required
            fullWidth
            name="trackNumber"
            label="Track number (in album)"
          />
            <TextField
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
            inputRef={newSong}
            required
            fullWidth
            name="lyrics"
            label="Lyrics"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={newSong}
            required
            fullWidth
            name="createdAt"
            label="Created at: YY-MM-DD"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={newSong}
            required
            fullWidth
            name="uploadAt"
            label="Upload at: YY-MM-DD HH:MM:SS"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add song
          </Button>
        </form>
      </div>
    </Container>
    </div>
    : <Loader/>
  );
}

export default AddSong;