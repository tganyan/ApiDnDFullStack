import superagent from 'superagent';
import * as routes from '../routes';


// Sync actions

export const set = gameInfo => ({
  type: 'DUNGEON_START',
  payload: gameInfo,
});

export const start = alias => ({
  type: 'DUNGEON_MOVE',
  payload: alias,
});


//Async actions

export const dungeonStartRequest = () => (store) => {
  const { token } = store.getState();
  const parsedToken = JSON.parse(token);
  return superagent.get(`${API_URL}${routes.GET_ROOM_INFO_BACKEND}`)
      .set('Authorization', `Bearer ${parsedToken.token}`)
      .then((response) => {
        return store.dispatch(set(response.body));
      })
      .catch(console.error);
};

// export const loginRequest = user => (store) => {
//   return superagent.get(`${API_URL}${routes.LOGIN_BACKEND}`)
//       .auth(user.username, user.password)
//       .then((response) => {
//         return store.dispatch(set(response.text));
//       });
// };
