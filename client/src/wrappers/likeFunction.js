import { create } from '../wrappers/ajax';

export default function likeFunction (song, user, wasLiked) {
  const interaction = {
    userId: user.id, 
    songId: song.id,
    isLiked: wasLiked ? 0 : 1,
    playCount: 1,
  }

  create(`/api/v1/songs/${song.id}/user-liked/${user.id}`, interaction)
}