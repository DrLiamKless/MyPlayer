import React from 'react';
import { create } from "../../../wrappers/ajax"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));;

function SignUp() {
  const classes = useStyles();

  const {register: signUp, handleSubmit: handleSignUp} = useForm()

  const onSignUp = data => {
    create("users/add", data);
    window.location = '/Login';
  } 
  
  return (
    <div className={"home-section"} style={{backgroundColor: "rgb(99,84,65)"}}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
            Not a member?
        </Typography>
        <form  
          className={classes.form} 
          noValidate onSubmit={handleSignUp(onSignUp)}>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={signUp}
            required
            fullWidth
            label="username"
            name="userName"
            autoFocus
          />
        <div className={"add-artist-container"}>
        </div>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={signUp}
            required
            fullWidth
            name="password"
            label="password"
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={signUp}
            required
            fullWidth
            name="email"
            label="email"
          />
          <Select placeholder="albums" native inputRef={signUp} name="rememberToken" variant="outlined">
          <option value={1}>yes</option>
          <option value={0}>no</option>
          </Select>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
        </form>
      </div>
    </Container>
    </div>
  );
}

export default SignUp;
