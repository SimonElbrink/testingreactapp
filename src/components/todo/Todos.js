import React, { useContext } from 'react';
import TodoContext from './../../context/todo/TodoContext';
import { useEffect } from 'react';
import Spinner from './../layout/Spinner';
import { Link } from 'react-router-dom';

const Todos = () => {
  const todoContext = useContext(TodoContext);
  const { loading, todos, getTodos } = todoContext;

  useEffect(() => {
    getTodos();
  }, []);

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <Link to='newTodo' className='btn btn-light'>
          Create new Todo
        </Link>
        <ul>
          <li className='showTodos head'>
            <div>Date</div>
            <div>Title</div>
            <div>Description</div>
            <div>Assigned to</div>
            <div>Done</div>
            <div></div>
          </li>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      </div>
    );
  }
};

const TodoItem = ({ todo }) => (
  <li className='showTodos'>
    <div>{todo.deadline}</div>
    <div>{todo.title}</div>
    <div>{todo.description}</div>
    <div>{`${todo.assignee.firstName} ${todo.assignee.lastName}`}</div>
    <div>{todo.done.toString()}</div>
    <div>
      <Link to={`/todo/${todo.id}`}>Edit</Link>
    </div>
  </li>
);

export default Todos;
