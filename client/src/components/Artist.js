import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { brown } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';
import Loader from './Loader'


const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', 
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  card: {
    backgroundColor: "rgba(13, 18, 24, 0.692)",
    color: "white",
  },
}));
 

function Song({ artist, setSongToPlay }) {

    const classes = useStyles();

  return (
    artist.id ?
    <div className={"card"}>
      <Card className={classes.card}>
        <CardHeader
          disableTypography={false}
          title={artist.artistName}
        >
        </CardHeader>
        <CardContent className={"album-container"}>
          <Link to={`/artist/${artist.id}`}>
          <div className={"logo-container"}>
            {<img src={artist.artistCoverImg} className="card-logo" alt="logo" />}
          </div>
          </Link> 
        </CardContent>
      </Card>
    </div>
    : <Loader/>
  )
}

export default Song;
