import React from 'react';
import { read, destroy } from "../wrappers/ajax"
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { brown } from '@material-ui/core/colors';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RemoveIcon from '@material-ui/icons/Remove';
import Loader from './Loader'



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
    card: {
      backgroundColor: "rgba(13, 18, 24, 0.692)",
      color: "white",
    },
  }));
 

function Playlist({ playlist }) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleRemoveFromPlaylist = (songId) => {
      read(`/api/v1/playlists/songInPlaylist/${songId}/${playlist.id}`).then(songInPlaylist => {
        destroy(`api/v1/playlists/removeSong/${songInPlaylist.id}`);
      })
    }


const date = new Date(playlist.createdAt);
  return (
    playlist.playlistName ? 
    <div className={"card"} >
    <Card className={classes.card}>
        <CardHeader
          title={playlist.playlistName}
          subheader={date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate() + ' by ' + playlist['Users'][0].userName}
        />
        <Link to={`/playlist/${playlist.id}`}>
          <CardContent className={"logo-container"}>
            <img src={playlist.playlistCoverImg} className="playlist-logo" alt="logo"></img>
          </CardContent>
        </Link>
        <CardActions disableSpacing>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show songs list"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
                <Typography>songs:</Typography>
              <ul>
                {playlist.Songs.map((song, i) => (
                  <li 
                    key={i}
                    className={"playlist-list-item"}>
                      <Link 
                      to={`/song/${song.id}?playlist=${playlist.id}`}
                      style={{color: 'black'}}>
                        <h5>{song.songName}</h5>
                      </Link>
                    <IconButton
                    aria-label="remove from playlist"
                    onClick={()=>{handleRemoveFromPlaylist(song.id)}}>
                      <RemoveIcon/>
                    </IconButton>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Collapse>
      </Card>
    </div>
    : <Loader/>
  )
}

export default Playlist;
