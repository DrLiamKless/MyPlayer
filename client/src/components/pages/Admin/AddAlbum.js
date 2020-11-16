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
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    gap: "15px"
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
    <div className={"admin-section"} style={{backgroundColor: "rgba(0,31,63,0.8)"}} >
        <form  
        className={classes.form}
        noValidate onSubmit={handleNewAlbum(onSubmitAlbum)}>
        <h1>Add a new Album</h1>
        <div>
          <InputLabel id="label">Artist</InputLabel>
          <Select fullWidth placeholder="artists" native inputRef={newAlbum} name="artistId" variant="outlined">
            {artists.map(artist => (<option key={artist.artistName} value={artist.id}>{artist.artistName}</option>))}
          </Select>
        </div>
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={newAlbum}
            required
            name="albumName"
            label="Name"
        />
        <TextField
        variant="outlined"
        margin="normal"
        inputRef={newAlbum}
        required
        name="albumCoverImg"
        label="album cover image"
        />
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            inputRef={newAlbum}
        >
            Add album
        </Button>
        </form>
      </div>
    : <Loader/>
  );
}

export default AddAlbum;
