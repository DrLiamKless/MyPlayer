var mixpanel = require('mixpanel-browser');

mixpanel.init("604c09ff43a4102330d4013e7061ee7e");

export const mixpanelTrackLoggedIn = () => mixpanel.track("Logged In");

export const mixpanelTrackEnteredLoginPage = () => mixpanel.track("Entered Login Page Page");

export const mixpanelTrackUrlChanged = (path) => mixpanel.track("URL Changed", {"path": path});

export const mixpanelTrackSongPlayed = (songName) => mixpanel.track("Song Played", {"name": songName});

export const mixpanelTrackSongLiked = (songName) => mixpanel.track("Song Liked", {"name": songName});

export const mixpanelTrackSongUnliked = (songName) => mixpanel.track("Song Unliked", {"name": songName});

