import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import 'fontsource-roboto';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { brown } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../Loader'


const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    width: "400px",
    backgroundColor: brown[500],
    marginLeft: "20px",
    marginTop: "100px",
    padding: '10px',
    textAlign: "center",
  }
}));

function Player({ songToPlay, user }) {
  
  const classes = useStyles();

  return (
    songToPlay ?    
      <Draggable allowAnyClick={false} defaultPosition={{x: 100, y: 1000}}>
      <Paper className={classes.paper}>
        <h1>Drag Me!</h1>
          <iframe title={"player"} src={
            `${songToPlay.youtubeLink}?autoplay=1`}
            allow={"autoplay"}
            frameBorder={0}
            height={260}>
          </iframe>
          <div className={'lyrics-container'}>
          <p>
            {songToPlay.lyrics}
          </p>
          </div>
      </Paper>
    </Draggable>
    : <Loader/>
  );
}

export default Player;
