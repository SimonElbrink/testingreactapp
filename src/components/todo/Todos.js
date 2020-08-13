/* Todos component is a list of todos  */

import React, { useContext } from 'react';
import TodoContext from './../../context/todo/TodoContext';
import { useEffect } from 'react';
import Spinner from './../layout/Spinner';
import { Link } from 'react-router-dom';

const Todos = () => {
  //we use the context to access the methods and states
  const todoContext = useContext(TodoContext);
  const { loading, todos, getTodos } = todoContext;

  //Here useEffect is passed as an empty array, []. Therefore, the effect function will be called only on mount
  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  //useState allows us to create a local state and change it within this component. Here we are using it to set the result of the search and the search string

  const [search_todos, setSearchTodos] = React.useState([]);
  const [search, setSearch] = React.useState('');

  // if the api call takes time show the spinner

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        {/* input field to search todos */}

        <input
          onChange={(e) => {
            const test = todos.filter((todo) => {
              return todo.description
                .toLowerCase()
                .includes(e.target.value.toLowerCase());
            });
            /* here we use the setState functions to set result and searchString */
            setSearchTodos(test);
            setSearch(e.target.value);
          }}
          placeholder='Search todo'
          type='text'
          value={search}
        />
        {/* Link to create new Todo  */}
        <Link to='todo/newTodo' className='btn btn-light'>
          Create new Todo
        </Link>
        <table>
          <thead>
            <tr className='showTodos head'>
              <th>Date</th>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned to</th>
              <th>Done</th>
            </tr>
          </thead>
          {/* if the search resulted in more then one result then show the search otherwise  show the original result of todos. 
          Map is used to iterate the array */}
          {search_todos.length > 0
            ? search_todos.map((search_todo) => (
                <TodoItem key={search_todo.id} todo={search_todo} />
              ))
            : todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)}
        </table>
      </div>
    );
  }
};

/* TodoItem is used to show each todo item in the table  */

const TodoItem = ({ todo }) => (
  <tbody>
    <tr className='showTodos'>
      <td>{todo.deadline}</td>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>{`${todo.assignee.firstName} ${todo.assignee.lastName}`}</td>
      <td>{todo.done.toString()}</td>
      <td>
        <Link to={`/todo/${todo.id}`} className='btn btn-dark btn-sm'>
          Edit
        </Link>
      </td>
    </tr>
  </tbody>
);

export default Todos;
