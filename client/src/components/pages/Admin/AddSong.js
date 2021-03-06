import React from 'react';
import { create } from "../../../wrappers/ajax"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import {useForm} from 'react-hook-form'



const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    gap: "15px"
  },
}));;

function AddSong({ artists, albums }) {
  const classes = useStyles();

  const {register: newSong, handleSubmit: handleNewSong} = useForm()

 

  const onSubmitSong = data => {
    create("/api/v1/songs/add", data)
  } 

  
  return (
    <div className={"admin-section"}>
        <form  
          className={classes.form} 
          noValidate onSubmit={handleNewSong(onSubmitSong)}>
            <h1>Add song</h1>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={newSong}
            required
            label="Youtube Link (Embded Code)"
            name="youtube_link"
            autoFocus
            />
        <div className={"add-artist-container"}>
            <div>
              <InputLabel id="label">album</InputLabel>
              <Select placeholder="albums" native inputRef={newSong} name="albumId" variant="outlined">
              {albums.map(album => (<option key={album.albumName} value={album.id}>{album.albumName}</option>))}
              </Select>
            </div>
            <div className="add-artist-modal">
            </div>
        </div>
        <div className={"add-artist-container"}>
            <div>
              <InputLabel id="label">Artist</InputLabel>
              <Select placeholder="artists" native inputRef={newSong} name="artistId" variant="outlined">
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
            name="songName"
            label="Name"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={newSong}
            required
            name="length"
            label="Length: HH:MM:SS"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add song
          </Button>
        </form>
      </div>
  );
}

export default AddSong;
