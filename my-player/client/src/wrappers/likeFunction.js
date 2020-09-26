import { create } from '../wrappers/ajax';

export default function likeFunction (song) {
    function removeLinebreaks( str ) { 
      return str.replace( /[\r\n]+/gm, "" ); 
  } 
    const date = new Date(Date.now())
    const dateToShow = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  

    if (!song.Interactions[0]) {
      const interaction = {
        userId: 1, 
        songId: song.id,
        isLiked: 1,
        playCount: 1,
      }
      create(`/songs/like/${song.id}`, interaction)
    } else {
      create(`/songs/like/${song.id}`, {isLiked: song.Interactions[0].isLiked === true ? false : true})
    }
  }