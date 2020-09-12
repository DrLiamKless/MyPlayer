import React from 'react';
import { create } from "../../wrappers/ajax"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useForm} from 'react-hook-form'

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


function AddArtist() {
  const classes = useStyles();
  const {register: newArtist, errors: newArtistErrors, handleSubmit: handleNewArtist} = useForm()

  const onSubmitArtist = data => {
    create("/artist", data)
  } 

  return (
    <div className={"home-section"} style={{backgroundColor: "rgba(43,19,21,0.9)"}}>
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <RecordVoiceOverIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add a new artist
        </Typography>
        <form  
            className={classes.form}
            noValidate onSubmit={handleNewArtist(onSubmitArtist)}>
            <TextField
                variant="outlined"
                margin="normal"
                inputRef={newArtist}
                required
                fullWidth
                name="name"
                label="Name"
            />
            <TextField
                variant="outlined"
                margin="normal"
                inputRef={newArtist}
                required
                fullWidth
                name="cover_img"
                label="Cover image"
            />
            <TextField
                variant="outlined"
                margin="normal"
                inputRef={newArtist}
                required
                fullWidth
                name="upload_at"
                label="Upload at: YY-MM-DD HH:MM:SS"
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
    </Container>
    </div>
  );
}

export default AddArtist;
