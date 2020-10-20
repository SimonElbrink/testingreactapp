/* The Action is a collection of functions that sends data to the reducer to update the state. The state is initialized in the action.
here "const [state, dispatch] = useReducer(TodoReducer, initialState)". The actions will send data to teh reducer using the keyword dispatch.
The dispatch always start with a type and then teh payload to be altered, it can also send additional parameters to the reducer.

Remember to return the context.provider in order to be able to access the actions throughout the application.
In this application we are using axios to access the todos from another system through API calls and we also use a internal static list
of users */

import React, { useReducer } from 'react';
import TodoContext from './TodoContext';
import TodoReducer from './TodoReducer';
import { GET_TODO, SET_LOADING, GET_TODOS, GET_USERS } from '../types';
import axios from 'axios';
import history from '../../components/layout/History';

const TodoAction = (props) => {
  const initialState = {
    todos: [],
    todo: {},
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  /* saveTodo is two functions depending if an id is sent with the data. If id exist then we update, 
  using axios.put otherwise it is a new object and we use axios.post */

  const saveTodo = (todo) => {
    setLoading();
    if (todo.id != null) {
      axios
        .put(`https://nameless-sea-91978.herokuapp.com/api/todoItem/` + todo.id, todo, {
          headers: {
            Accept: '*/*',
          },
        })
        .then((res) => {
          getTodo(res.data.id);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`https://nameless-sea-91978.herokuapp.com/api/todoItem/`, todo, {
          headers: {
            Accept: '*/*',
          },
        })
        .then(() => {
          history.goBack();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  /* getTodos get all the Todos using axios.get and then using dispatch to set the state of todos in the reducer */

  const getTodos = async () => {
    setLoading();
    await axios
      .get(`https://nameless-sea-91978.herokuapp.com/api/todoItem`)
      .then((res) => {
        dispatch({
          type: GET_TODOS,
          payload: res.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* getTodo get a specific Todos using axios.get using the id, and then using dispatch to set the state of todo in the reducer */

  const getTodo = async (todoId) => {
    setLoading();
    await axios
      .get(`https://nameless-sea-91978.herokuapp.com/api/todoItem/` + todoId)
      .then((res) => {
        const users = [
          {
            firstName: 'Fredrik',
            lastName: 'Odin',
            id: 'Example-User-3',
          },
          {
            firstName: 'Simon',
            lastName: 'Elbrink',
            id: 'Example-User-1',
          },
          {
            firstName: 'Ulf',
            lastName: 'Bengtsson',
            id: 'Example-User-2',
          },
        ];
        dispatch({
          type: GET_TODO,
          payload: res.data,
          users: users,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  /* getUsers get a specific Todos using a local static list  and then using dispatch to set the state of users in the reducer */

  const getUsers = () => {
    const res = [
      {
        firstName: 'Fredrik',
        lastName: 'Odin',
        id: 'Example-User-3',
      },
      {
        firstName: 'Simon',
        lastName: 'Elbrink',
        id: 'Example-User-1',
      },
      {
        firstName: 'Ulf',
        lastName: 'Bengtsson',
        id: 'Example-User-2',
      },
    ];

    dispatch({
      type: GET_USERS,
      payload: res,
    });
  };

  /* setLoading sets loading and then using dispatch to set the state of loading in the reducer */

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        todo: state.todo,
        loading: state.loading,
        users: state.users,
        getTodo,
        getTodos,
        getUsers,
        saveTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};
export default TodoAction;
