import { create } from '../wrappers/ajax';

export default function likeFunction (song, user, wasLiked) {

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