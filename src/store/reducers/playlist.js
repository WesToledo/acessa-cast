const INITIAL = {
  currentIndex: 0,
  podcasts: [
    {
      title: "Hamlet - Act I",
      author: "William Shakespeare",
      source: "Librivox",
      uri: "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
      imageSource:
        "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
    },
    {
      title: "Hamlet - Act II",
      author: "William Shakespeare",
      source: "Librivox",
      uri: "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3",
      imageSource:
        "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
    },
    {
      title: "Hamlet - Act III",
      author: "William Shakespeare",
      source: "Librivox",
      uri: "http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3",
      imageSource:
        "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
    },
    {
      title: "Hamlet - Act IV",
      author: "William Shakespeare",
      source: "Librivox",
      uri: "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3",
      imageSource:
        "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
    },
    {
      title: "Hamlet - Act V",
      author: "William Shakespeare",
      source: "Librivox",
      uri: "https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3",
      imageSource:
        "http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg",
    },
  ],
};

export default function playlist(state = INITIAL, action) {
  switch (action.type) {
    case "ADD_ONE":
      return {
        ...state,
        podcasts: [...podcasts, action.payload.podcast],
      };
    case "ADD_MANY":
      return {
        ...state,
        podcasts: [...podcasts, ...action.payload.podcast],
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
