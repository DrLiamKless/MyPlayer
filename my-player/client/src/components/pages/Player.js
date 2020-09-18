import React from 'react';
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
  
  const classes = useStyles();

  return (
    <div className={"player"} style={{backgroundColor: "rgb(43,19,21)"}}>
        <div className={"iframe"}>
        <iframe  src={songToPlay ?
         `${songToPlay.youtube_link}?autoplay=1` : 
         "https://img.icons8.com/cotton/2x/no-record.png"} 
          className={"video"}
          allow={"autoplay"}
          frameBorder={0}
          height={260}></iframe>
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
