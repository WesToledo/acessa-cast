const INITIAL = {
  authenticated: false,
  user: {},
};

export default function auth(state = INITIAL, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        authenticated: true,
        user: {
          ...action.payload,
        },
      };

    case 'LOGOUT':
      return {INITIAL};
    default:
      return state;
  }
}
