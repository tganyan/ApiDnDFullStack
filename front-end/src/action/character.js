import superagent from 'superagent';
import * as routes from '../routes';


// Sync actions
export const set = token => ({
  type: 'RETRIEVE_CHARACTER',
  payload: token,
});

export const remove = () => ({
  type: 'CHARACTER_REMOVE',
});


//Async actions

export const getCharRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.GET_CHAR_BACKEND}`)
      .send(user)
      .then((response) => {
        return store.dispatch(set(response.text));
      });
};

export const removeCharRequest = user => (store) => {
  return superagent.delete(`${API_URL}${routes.GET_CHAR_BACKEND}`)
      .send(user)
      .then((response) => {
        return store.dispatch(set(response.text));
      });
};
