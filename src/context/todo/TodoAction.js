import React, { useReducer } from 'react';
import TodoContext from './TodoContext';
import TodoReducer from './TodoReducer';
import { GET_TODO, SET_LOADING, GET_TODOS, GET_USERS } from './../types';
import axios from 'axios';

const TodoAction = (props) => {
  const initialState = {
    todos: [],
    todo: {},
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const saveTodo = (todo) => {
    setLoading();
    if (todo.id != null) {
      axios
        .put(`http://192.168.1.239:8080/api/todoItem/` + todo.id, todo, {
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
        .post(`http://192.168.1.239:8080/api/todoItem/`, todo, {
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
    }
  };

  const getTodos = async () => {
    setLoading();
    const res = await axios.get(`http://192.168.1.239:8080/api/todoItem`);
    dispatch({
      type: GET_TODOS,
      payload: res.data,
    });
  };

  const getTodo = async (todoId) => {
    setLoading();
    const res = await axios.get(
      `http://192.168.1.239:8080/api/todoItem/` + todoId
    );

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
  };
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
