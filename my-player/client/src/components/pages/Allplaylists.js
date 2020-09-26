import React, { useState, useEffect } from 'react';
import { read, create } from "../../wrappers/ajax"
import Playlist from '../Playlist';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useForm} from 'react-hook-form'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Loader from '../Loader'








function Allplaylists() {

    const [playlists, setPlaylists] = useState([])
    const [open, setOpen] = useState(false);
    const {register: addNewPlaylist, handleSubmit: handleAddNewPlaylist} = useForm()


    useEffect(() => {
      read("/playlists").then((res) => {
        setPlaylists(res)
      });
    }, []);


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const onAddNewPlaylist = data => {
      console.log('function from client started')
      create("/playlists/add", data);
      console.log('function from client ended')
      handleClose()
    } 


  

  return (
  playlists != null ?
  <div className="App">
    <header className="App-header">
      <p>All Playlists</p>
    <Tooltip 
          title="create new playlist" placement={"bottom"}
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
            noValidate onSubmit={handleAddNewPlaylist(onAddNewPlaylist)}>
            <div>
            <TextField
            autoFocus
            margin="dense"
            name="playlistName"
            label="playlist name"
            inputRef={addNewPlaylist}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="playlistCoverImg"
            label="playlist cover image (URL)"
            inputRef={addNewPlaylist}
            fullWidth
          />
            </div>
          <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          style={{marginBottom:"5px"}}
          inputRef={addNewPlaylist}>
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
      <div className={"all-songs-container"}>
        {playlists.map(playlist => (
            <Playlist
              key={playlist.id}
              playlist={playlist}
            >
            </Playlist>
        ))}
      </div>
    </header>
  </div>
  : <Loader/>
  );
}

export default Allplaylists;
