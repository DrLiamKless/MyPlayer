import React from 'react';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import 'fontsource-roboto';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { brown } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import Loader from '../../Loader'


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

function Header({ songToPlay, user }) {
  
  const classes = useStyles();

  return (
    user ?
    <div className={"header"} style={{backgroundColor: "rgb(43,19,21)"}}>
        <h1>{`Welcome Back ${user}`}</h1>
    </div>
    : <Loader/>     
  );
}

export default Header;
