export function nextMusic(newIndex) {
  return {
    type: "PLAYLIST_NEXT_MUSIC",
    payload: {
      newIndex,
    },
  };
}
