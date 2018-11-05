const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'RETRIEVE_CHARACTER':
      return payload;
    case 'CHARACTER_REMOVE':
      return initialState;
    default:
      return state;
  }
}
