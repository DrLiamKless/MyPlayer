import React, { useState, useEffect } from 'react';
import { read } from "../wrappers/ajax"
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
    const [songsList, setSongsList] = useState([]);
  
    useEffect(() => {
      read(`/playlists/songsList/${playlist.playlist_id}`).then((res) => {
        setSongsList(res)
      });
    });

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleRemoveFromPlaylist = (id) => {
      read(`/playlists/removeSong/${id}`);
      read(`/playlists/songsList/${playlist.playlist_id}`).then((res) => {
        setSongsList(res)
      });
    }


const date = new Date(playlist.created_at);
  return (
    <div className={"card"} >
   <Card className={classes.card}>
      <CardHeader
        title={playlist.playlist_name}
        subheader={date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()}
      />
      <Link to={`/singlePlaylist/${playlist.playlist_id}`}>
        <CardContent>
          <img src={playlist.playlist_cover_img} className="artist-logo" alt="logo"></img>
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
              {songsList.map((song, i) => (
                <div 
                key={i}
                className={"playlist-list-item"}>
                <Link 
                to={`/song/${song.song_id}?playlist=${song.playlist_id}`}
                style={{color: 'black'}}>
                  <p>{song.song_name}</p>
                  </Link>
                  <IconButton
            aria-label="remove from playlist"
            onClick={()=>{handleRemoveFromPlaylist(song.songs_in_playlists_id)}}
            >
            <RemoveIcon/>
          </IconButton>
            </div>
              ))}
          </CardContent>
        </Collapse>
    </Card>
    </div>




  )
}

export default Playlist;
