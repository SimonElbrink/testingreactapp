/* The Reducer is a function that gets a previous state and an action with data, and returns the new state.
eg the Reducer recieve the previous state and action GET_TODOS it will also get the payload and sometimes additional data from the action.
The reducer will then update the state of todos with the payload recieved from action and set the loading state to false*/

import { GET_TODO, SET_LOADING, GET_TODOS, GET_USERS } from './../types';

export default (state, action) => {
  switch (action.type) {
    case GET_TODO:
      return {
        ...state,
        todo: action.payload,
        users: action.users,
        loading: false,
      };
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
        loading: false,
      };
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
