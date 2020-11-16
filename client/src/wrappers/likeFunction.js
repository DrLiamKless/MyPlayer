import { create } from '../wrappers/ajax';

export default function likeFunction (song, user, wasLiked) {
    function removeLinebreaks( str ) { 
      return str.replace( /[\r\n]+/gm, "" ); 
  } 
    const date = new Date(Date.now())
    const dateToShow = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  

    if (!wasLiked) {
      const interaction = {
        userId: user.id, 
        songId: song.id,
        isLiked: 1,
        playCount: 1,
      }
      create(`/api/v1/songs/${song.id}/user-liked/${user.id}`, interaction)
    } else {
      create(`/api/v1/songs/${song.id}/user-liked/${user.id}`, {isLiked: wasLiked ? false : true})
    }
  }