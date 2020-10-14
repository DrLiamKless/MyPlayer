import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import { brown } from '@material-ui/core/colors';
import Loader from './Loader'



const useStyles = makeStyles((theme) => ({
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
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
      backgroundColor: brown[500],
    },
  }));
 

function Album({ album }) {

    const classes = useStyles();

  return (
    album ?
    <div className={"card"}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt="artist img" src={album.Artists[0] && album.Artists[0].artistCoverImg}>
            </Avatar>
          }
          title={album.albumName}
          disableTypography={false}
          // subheader="song's artist"
        ></CardHeader>
        <CardContent>
        <Link to={`/album/${album.id}`}>
        <div className={"album-container"}>
        {<img src={"https://assets.onlinelabels.com/images/clip-art/BenBois/BenBois_Vinyl_records.png"} 
        className="back-logo" alt="logo" />}
        {<img src={album.albumCoverImg} className="album-logo" alt="logo" />}
        </div>
        </Link>
        </CardContent>
      </Card>
    </div>
    : <Loader/>
  )
}

export default Album;
