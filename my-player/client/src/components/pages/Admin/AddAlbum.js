import React from 'react';
import { create } from "../../../wrappers/ajax"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
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
    display: "flex",
    flexDirection: "column",
    alignItems: 'center'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));;


function AddAlbum({ artists }) {
  const classes = useStyles();
  const {register: newAlbum, handleSubmit: handleNewAlbum} = useForm()

  const onSubmitAlbum = data => {
    create("api/v1/albums/add", data)
  } 
  
  return (
    artists != null ?
    <div className={"home-section"} style={{backgroundColor: "rgba(0,31,63,0.8)"}} >
    <Container component="main" maxWidth="xs" >
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LibraryMusicIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Add a new Album
      </Typography>
        <form  
            className={classes.form}
            noValidate onSubmit={handleNewAlbum(onSubmitAlbum)}>
            <div>
              <InputLabel id="label">Artist</InputLabel>
              <Select fullWidth placeholder="artists" native inputRef={newAlbum} name="artist_id" variant="outlined">
              {artists.map(artist => (<option key={artist.artistName} value={artist.id}>{artist.artistName}</option>))}
              </Select>
            </div>
            <TextField
                variant="outlined"
                margin="normal"
                inputRef={newAlbum}
                required
                fullWidth
                name="albumName"
                label="Name"
            />
            <TextField
            variant="outlined"
            margin="normal"
            inputRef={newAlbum}
            required
            fullWidth
            name="albumCoverImg"
            label="album cover image"
            />
            <TextField
            variant="outlined"
            margin="normal"
            inputRef={newAlbum}
            required
            fullWidth
            name="createdAt"
            label="Created at: YY-MM-DD"
          />
            <TextField
                variant="outlined"
                margin="normal"
                inputRef={newAlbum}
                required
                fullWidth
                name="uploadAt"
                label="Upload at: YY-MM-DD HH:MM:SS"
            />
            <Button
                type="submit"
                variant="contained"
                fullWidth
                color="primary"
                className={classes.submit}
                inputRef={newAlbum}
            >
                Add album
            </Button>
            </form>
            </div>
    </Container>
    </div>
    : <Loader/>
  );
}

export default AddAlbum;
