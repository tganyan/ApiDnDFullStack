const initialState = null;

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'DUNGEON_START':
      return payload;
    case 'DUNGEON_MOVE':
      return payload;
    case 'TOKEN_REMOVE':
      return null;
    default:
      return state;
  }
}
