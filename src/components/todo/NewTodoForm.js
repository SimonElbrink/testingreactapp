import React, { useContext, useEffect, Fragment } from 'react';
import TodoContext from './../../context/todo/TodoContext';
import { useForm } from 'react-hook-form';
import Spinner from './../layout/Spinner';
import { Link } from 'react-router-dom';

const TodoForm = ({}) => {
  const todoContext = useContext(TodoContext);
  const { loading, getUsers, users, saveTodo } = todoContext;

  useEffect(() => {
    getUsers();
  }, []);

  const { register, handleSubmit, errors } = useForm();
  const onsubmit = (data) => saveTodo(data);
  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to List
      </Link>
      <form name='todoForm' onSubmit={handleSubmit(onsubmit)}>
        <label htmlFor='deadline'>Deadline</label>
        <input
          type='text'
          name='deadline'
          aria-invalid={errors.deadline ? 'true' : 'false'}
          id='deadline'
          ref={register({ required: true })}
        />
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          name='title'
          aria-invalid={errors.title ? 'true' : 'false'}
          id='title'
          ref={register({ required: true })}
        />
        <label htmlFor='description'>Description</label>
        <input type='text' name='description' id='description' ref={register} />
        <label htmlFor='assignee'>Assigned To</label>
        <select name='assignee' ref={register}>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {`${user.firstName} ${user.lastName}`}
            </option>
          ))}
        </select>
        <label htmlFor='done'>Done</label>
        <input type='checkbox' name='done' id='done' ref={register} />
        <div>
          {errors.deadline && <span role='alert'>Deadline is required</span>}
          {errors.title && <span role='alert'>Title is required</span>}
          <button type='submit'>Save</button>
        </div>
      </form>
    </Fragment>
  );
};

export default TodoForm;
