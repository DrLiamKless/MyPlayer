import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { CardMedia } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
    media: {
      height: 120,
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
    avatar: {
      backgroundColor: red[500],
    },
  }));
 

function Playlist(props) {

    const classes = useStyles();

const date = new Date(props.createdAt);
  return (
    <div className={"playlist"}>
   <Card>
      <CardHeader
        avatar={
          <Avatar alt="playlist img" src={props.coverImg}>
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.playlist_name}
        subheader={date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()}
      />
      <CardMedia
        component="img"
        className={classes.media}
        title="playlist image"
        src="https://www.adobe.com/content/dam/cc/us/en/creativecloud/video/discover/how-to-mix-music/desktop/mix-music_P1_900x420.jpg.img.jpg"
      ></CardMedia>
      <CardContent>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="Like">
          <FavoriteIcon />
        </IconButton>
        <Link to={`/singlePlaylist/${props.id}`}>
        <IconButton>
          <PlayArrowIcon>
          </PlayArrowIcon>
        </IconButton>
        </Link>
      </CardActions>
        <CardContent>
          <Typography paragraph>Songs:</Typography>
          <Typography paragraph>
            {props.songsList}
          </Typography>
        </CardContent>
    </Card>
    </div>




  )
}

export default Playlist;
