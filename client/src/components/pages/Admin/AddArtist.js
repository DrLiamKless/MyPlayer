import React from 'react';
import { create } from "../../../wrappers/ajax"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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


function AddArtist() {
  const classes = useStyles();
  const {register: newArtist, handleSubmit: handleNewArtist} = useForm()

  const onSubmitArtist = data => {
    create("/api/v1/artists/add", data)
  } 

  return (
    <div className={"admin-section"}>
      <form  
        className={classes.form}
        noValidate onSubmit={handleNewArtist(onSubmitArtist)}
      >
        <h1 component="h1" variant="h5">Add a new artist</h1>
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={newArtist}
            required
            name="artistName"
            label="Name"
        />
        <TextField
            variant="outlined"
            margin="normal"
            inputRef={newArtist}
            required
            name="artistCoverImg"
            label="Cover image"
        />
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            inputRef={newArtist}
        >
            Add artist
        </Button>
      </form>
    </div>
  );
}

export default AddArtist;
