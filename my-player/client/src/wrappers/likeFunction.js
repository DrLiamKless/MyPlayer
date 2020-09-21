import { create } from '../wrappers/ajax';

export default function likeFunction (song) {
  console.log('starting like function')
  console.log(song)

    function removeLinebreaks( str ) { 
      return str.replace( /[\r\n]+/gm, "" ); 
  } 
    const date = new Date(Date.now())
    const dateToShow = `${date.getFullYear()}-${(date.getMonth() + 1)}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    
    const interaction = {
      user_id: song.user_id, 
      song_id: song.song_id,
      is_liked: song.is_liked,
      play_count: song.play_count = 1,
      created_at: removeLinebreaks(dateToShow),
    }
    if (interaction.is_liked == null) {
      console.log('when dont exist')
      create('/songs/likeButton', interaction)
      console.log(interaction)
    } else {
      interaction.is_liked == 0 ? interaction.is_liked = 1 : interaction.is_liked = 0
      console.log('when exist')
      create('/songs/likeButton', interaction)
      console.log(interaction)
    }
  }