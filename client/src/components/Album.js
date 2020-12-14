import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Loader from './Loader'

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', 
  },
  card: {
    backgroundColor: "rgba(13, 18, 24, 0.692)",
    color: "white",
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
            <Avatar alt="artist img" src={album.Artists[0] && album.Artists[0].artistCoverImg}></Avatar>
          }
          title={album.albumName.length >= 31 ? album.albumName.substring(0,31) + '..' : album.albumName}
          disableTypography={false}>
        </CardHeader>
        <CardContent>
          <Link to={`/album/${album.id}`}>
          <div className={"logo-container"}>
            {<img src={album.albumCoverImg} className="card-logo" alt="logo" />}
          </div>
          </Link>
        </CardContent>
      </Card>
    </div>
    : <Loader/>
  )
}

export default Album;
