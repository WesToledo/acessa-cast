export function beginPlaying({ sound, trackLength }) {
  return {
    type: "BEGIN_PLAYING",
    payload: {
      trackLength,
    },
  };
}

export function playPauseMusic(isPlaying) {
  return {
    type: "PLAY_PAUSE_MUSIC",
    payload: {
      isPlaying,
    },
  };
}

export function updateSeekCurrentPosition(currentPosition) {
  return {
    type: "UPDATE_SEEK_CURRENT_POSITION",
    payload: {
      currentPosition,
    },
  };
}

export function nextMusic() {
  return {
    type: "CONTROLLER_NEXT_MUSIC",
    payload: {},
  };
}

export function setLoading() {
  return {
    type: "SET_LOADING",
    payload: {},
  };
}
