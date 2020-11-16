import React, { useContext } from 'react';
import { User } from '../../contexts/userContext';
import 'fontsource-roboto';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { brown } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    width: "400px",
    backgroundColor: brown[500],
    marginLeft: "20px",
    marginTop: "100px",
    textAlign: "center",
  }
}));

function Player({ songToPlay }) {
  const user = useContext(User)
  const classes = useStyles();

  return (
    <div className={"player"} style={{backgroundColor: "rgb(43,19,21)"}}>
        <div className={"iframe"} >
        {songToPlay ?
        <iframe title={"player"} src={
          `${songToPlay.youtubeLink}?autoplay=1`}
          className={"video"}
          allow={"autoplay"}
          frameBorder={0}
          height={260}></iframe>
        : <h1>{user ? `Welcome Back ${user.userName}` : "Please Login. dont have a user!? Sign Up!"}</h1>
        }
         </div>
          {songToPlay && 
            <Paper className={classes.paper}>
              <Typography paragraph>
                {songToPlay.lyrics}
              </Typography>
            </Paper>
          }
    </div>     
  );
}

export default Player;
