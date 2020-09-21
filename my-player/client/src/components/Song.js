import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { brown } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { Link } from 'react-router-dom';
import Fade from '@material-ui/core/Fade';
import { read } from '../wrappers/ajax';
import likeFunction from "../wrappers/likeFunction"






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
 

function Song({ song, setSongToPlay, setLikeState, likeState}) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

  return (
    <div className={"card"}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar alt="artist img" src={song.artist_cover_img}>
            </Avatar>
          }
          title={song.song_name}
          disableTypography={false}
          // subheader="song's artist"
        ></CardHeader>
        <CardContent className={"logo-container"}>
        <Link to={`/song/${song.song_id}?artist=${song.artist_id}`}>
        {<img src={"https://assets.onlinelabels.com/images/clip-art/BenBois/BenBois_Vinyl_records.png"} className="logo" className="song-logo" alt="logo" />}
        </Link>
        </CardContent>
        <CardActions disableSpacing>
          <Tooltip 
          title={"add/remove from favorites"} placement={"bottom"}
          TransitionComponent={Fade} TransitionProps={{ timeout: 600 }}>
            <IconButton
              aria-label="Like"
              onClick={()=>{likeFunction(song); setLikeState(!likeState)}}>
              <FavoriteIcon 
              color={song.is_liked == 1 ? 'secondary' : 'inherit'}></FavoriteIcon>
            </IconButton>
          </Tooltip>
          <Tooltip 
          title="play" placement={"bottom"}
          TransitionProps={{ timeout: 600 }}>
            <IconButton aria-label="play" onClick={()=>{setSongToPlay(song)}}>
              <PlayArrowIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </div>




  )
}

export default Song;
