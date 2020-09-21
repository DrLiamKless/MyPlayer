import React, { useState, useEffect } from 'react';
import { read } from "../../wrappers/ajax"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from "react-router-dom";
import 'fontsource-roboto';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "50vw",
      height: "max-content",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    titleBar: {
      background:
        'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
        'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
      color: 'white',
    },
  }));

function AllArtists() {

    const [artists, setArtists] = useState([])
    const classes = useStyles();

    useEffect(() => {
      read("/artists").then((res) => {
        setArtists(res)
      });
    }, []);
  
  return (
    <header className="App-header">
      <p  className="all-artists-header">All Artists</p>
        <div className={"all-artists-container"}>
            <div className={classes.root}>
                <GridList cellHeight={150} spacing={2} className={classes.gridList}>
                    {artists.map((artist) => (
                      <GridListTile key={artist.artist_name} cols={1}>
                            <img src={artist.artist_cover_img} alt={artist.name} />
                              <Link to={`/artist/${artist.artist_id}`}>
                            <GridListTileBar
                                title={artist.artist_name}
                                titlePosition="top"
                                actionIcon={
                                  <IconButton aria-label={`star ${artist.name}`} className={classes.icon}>
                                  <StarBorderIcon></StarBorderIcon>
                                  </IconButton>
                                }
                                actionPosition="left"
                                className={classes.titleBar}
                                />
                                </Link>
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        </div>
    </header>
  );
}

export default AllArtists;
