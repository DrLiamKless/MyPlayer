import React from 'react';
import { create } from "../../../wrappers/ajax"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
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

function Login({ setUser }) {
  const classes = useStyles();

  const {register: Login, errors, handleSubmit: handleLogin} = useForm()

  const onLogin = data => {
    create("/api/v1/auth/login", data).then(res => {
      if (res.success) {
        window.location = '/';
      } else {
      console.log(res)
      }
    })
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
          Login
        </Typography>
        <form  
          className={classes.form} 
          noValidate onSubmit={handleLogin(onLogin)}>
          <TextField
            variant="outlined"
            margin="normal" 
            inputRef={Login({required: true, minLength: 10})}
            fullWidth
            label="email"
            name="email"
            autoFocus
          />
          {errors.email?.type === "required" && <p>Please Enter mail</p>}
          {errors.email?.type === "minLength" && <p>Please Enter valid mail</p>}
        <div className={"add-artist-container"}>
        </div>
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={Login({minLength: 1})}
            required
            fullWidth
            name="password"
            label="password"
            type="password"
          />
          <TextField
            inputRef={Login}
            fullWidth
            name="rememberMe"
            type="checkbox"
            label="remember me"
          />
          {errors.email?.type === "required" && <p>Please Enter password</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Button
            onClick={()=>{window.location = '/signUp'}}
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            SignUp
          </Button>
        </form>
      </div>
    </Container>
    </div>
  );
}

export default Login;
