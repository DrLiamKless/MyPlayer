import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { read } from "../../wrappers/ajax"
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Link } from "react-router-dom";
import 'fontsource-roboto';
import Loader from '../Loader'
import { mixpanelTrackUrlChanged } from '../../analytics/analyticsManager'

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

    const [artists, setArtists] = useState();
    const classes = useStyles();
    const location = useLocation();
  
    useEffect(() => {
      mixpanelTrackUrlChanged(location.pathname);
    },[])

    useEffect(() => {
      read("api/v1/artists").then((res) => {
        setArtists(res);
      });
    }, []);
  
  return (
    <div className="page">
    {artists != null ?
        <div className={"all-artists-container"}>
        <p  className="all-artists-header">All Artists</p>
            <div className={classes.root}>
                <GridList cellHeight={150} spacing={2} className={classes.gridList}>
                    {artists.map((artist) => (
                      <GridListTile key={artist.artisName} cols={1}>
                            <img src={artist.artistCoverImg} alt={artist.artistName} />
                              <Link to={`/artist/${artist.id}`}>
                            <GridListTileBar
                                title={artist.artistName}
                                titlePosition="top"
                                actionIcon={
                                  <IconButton aria-label={`star ${artist.artistName}`} className={classes.icon}>
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
        : <Loader/>}
    </div>
  );
}

export default AllArtists;
