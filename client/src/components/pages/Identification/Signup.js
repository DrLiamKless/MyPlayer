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
import { Link } from "react-router-dom";




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
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));;

function SignUp() {
  const classes = useStyles();

  const {register: signUp, errors, handleSubmit: handleSignUp} = useForm()

  const onSignUp = data => {
    create("/api/v1/users/add", data);
    window.location = '/';
  } 
  
  return (
    <div className={"login-section"}>
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
              inputRef={signUp({required: true, minLength: 10})}
              required
              fullWidth
              name="email"
              label="email"
            />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={signUp({required: true, minLength: 4})}
            required
            fullWidth
            label="username"
            name="userName"
            autoFocus
            />
            {errors.userName?.type === "required" && <p className="auth-error">Please Enter username</p>}
            {errors.userName?.type === "minLength" && <p className="auth-error">Your username must be 4 digits</p>}
          {errors.password?.type === "required" && <p className="auth-error">Please Enter password</p>}
          {errors.password?.type === "minLength" && <p className="auth-error">Your password must be 6 digits</p>}
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={signUp({required: true, minLength: 6})}
            required
            fullWidth
            name="password"
            label="password"
            type="password"
          />
          {errors.email?.type === "required" && <p className="auth-error">Please Enter mail</p>}
          {errors.email?.type === "minLength" && <p className="auth-error">Please Enter valid mail</p>}
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
      <span>already a member? <Link to="/">sign in</Link></span>
    </Container>
    </div>
  );
}

export default SignUp;
