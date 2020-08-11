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
