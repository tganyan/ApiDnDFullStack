import superagent from 'superagent';
import * as routes from '../routes';


// Sync actions
export const set = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const remove = () => ({
  type: 'TOKEN_REMOVE',
});


//Async actions

export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_BACKEND}`)
      .send(user)
      .then((response) => {
        return store.dispatch(set(response.text));
      });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.SIGNUP_BACKEND}`)
      .send(user.username, user.password)
      .then((response) => {
        return store.dispatch(set(response.text));
      });
};
