const INITIAL = {
  currentIndex: 0,
  podcasts: [],
};

export default function playlist(state = INITIAL, action) {
  switch (action.type) {
    case "ADD_ONE_TO_TOP":
      return {
        podcasts: [action.payload.podcast, ...state.podcasts],
        currentIndex: 0,
      };
    case "ADD_ONE":
      return {
        ...state,
        podcasts: [...state.podcasts, action.payload.podcast],
      };
    case "ADD_MANY":
      return {
        ...state,
        podcasts: [...state.podcasts, ...action.payload.podcast],
      };
    case "PLAYLIST_NEXT_MUSIC":
      return {
        ...state,
        currentIndex: action.payload.newIndex,
      };

    default:
      return state;
  }
}
