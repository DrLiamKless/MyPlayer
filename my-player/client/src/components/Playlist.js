import React, { useState, useEffect } from 'react';
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
      backgroundColor: brown[500],
    },
  }));
 

function Playlist({ playlist }) {

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleRemoveFromPlaylist = (songId) => {
      read(`/playlists/songInPlaylist/${songId}/${playlist.id}`).then(songInPlaylist => {
        console.log(songInPlaylist)
        destroy(`/playlists/removeSong/${songInPlaylist.id}`);
      })
    }


const date = new Date(playlist.createdAt);
  return (
    playlist.playlistName ? 
    <div className={"card"} >
   <Card className={classes.card}>
      <CardHeader
        title={playlist.playlistName}
        subheader={date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()}
      />
      <Link to={`/playlist/${playlist.id}`}>
        <CardContent>
          <img src={playlist.playlistCoverImg} className="artist-logo" alt="logo"></img>
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
            <Typography paragraph>songs:</Typography>
              {playlist.Songs.map((song, i) => (
                <div 
                key={i}
                className={"playlist-list-item"}>
                <Link 
                to={`/song/${song.id}?playlist=${playlist.id}`}
                style={{color: 'black'}}>
                  <p>{song.songName}</p>
                  </Link>
                  <IconButton
            aria-label="remove from playlist"
            onClick={()=>{handleRemoveFromPlaylist(song.id)}}
            >
            <RemoveIcon/>
          </IconButton>
            </div>
              ))}
          </CardContent>
        </Collapse>
    </Card>
    </div>
    : <Loader/>
  )
}

export default Playlist;
