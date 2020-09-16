import React, { useState, useEffect } from 'react';
import { read } from "../wrappers/ajax"
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { brown } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
    const [expanded, setExpanded] = React.useState(false);
    const [songsList, setSongsList] = useState([]);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    useEffect(() => {
      read(`/albums/songsList/${album.album_id}`).then((res) => {
        setSongsList(res)
      });
    }, []);


  return (
    <div className={"Album"}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt="artist img" src={album.artist_cover_img}>
            </Avatar>
          }
          title={album.album_name}
          disableTypography={false}
          // subheader="song's artist"
        ></CardHeader>
        <CardContent>
        <Link to={`/album/${album.album_id}`}>
        <div className={"album-container"}>
        {<img src={"https://assets.onlinelabels.com/images/clip-art/BenBois/BenBois_Vinyl_records.png"} 
        className="back-logo" alt="logo" />}
        {<img src={album.album_cover_img} className="album-logo" alt="logo" />}
        </div>
        </Link>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="Like">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show Lyrics"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>  
            {songsList.map((song, i) => (
              <Link to={`/song/${song.song_id}?album=${song.album_id}`}>
                <p>{i + 1} {song.song_name}</p>
              </Link>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>




  )
}

export default Album;
