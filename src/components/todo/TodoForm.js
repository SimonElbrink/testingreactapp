/* The TodoFrom is used to show Todo to edit and also to create a new todo  */

import React, { useContext, useEffect, Fragment } from 'react';
import TodoContext from './../../context/todo/TodoContext';
import { useForm } from 'react-hook-form';
import Spinner from './../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import './../../App.css';

const TodoForm = () => {
  //we use the context to access the methods and states

  const todoContext = useContext(TodoContext);
  const { loading, getTodo, getUsers, users, saveTodo, todo } = todoContext;

  /* we use useParams to access the id passed in to the component if no id then a new todo */
  let params = useParams();
  let isNew = false;

  if (params.id === 'newTodo') {
    isNew = true;
  }

  /*   we use useEffect to handle lifecycleMethods, in this case to load when the component is loaded. We have a condition that states if match.params.id exist,
  then run getTodo to ge the existing object otrwise run getusers to get all users */
  useEffect(() => {
    if (!isNew) {
      getTodo(params.id);
    } else {
      getUsers();
    }
    // eslint-disable-next-line
  }, []);

  //use form from react-hook-form to handle the form and use ref={register} to access the data with the same name in the input fields
  const { register, handleSubmit, errors } = useForm();

  //the form uses onsubmit to submit the form and send it to saveTodo from the comtext
  const onsubmit = (data) => saveTodo(data);
  if (loading) return <Spinner />;

  return (
    <Fragment>
      <Link to='/' className='btn btn-light'>
        Back to List
      </Link>
      <form name='todoForm' onSubmit={handleSubmit(onsubmit)}>
        {/* in order to use the same form to edit and create we need to hide id if it is a new todo */}
        {!isNew && (
          <input type='hidden' name='id' value={todo.id} ref={register} />
        )}
        {/* The form uses htmlFor to connect the label with input. aria-invalid sets
        the error if required is fulfilled or not, the defaultValue in determined
        if the todo exists */}

          <label htmlFor='deadline' className='form-text'>
            Deadline
          </label>
          <input
              type='datetime-local'
              name='deadline'
              aria-invalid={errors.deadline ? 'true' : 'false'}
              defaultValue={isNew ? '' : todo.deadline}
              ref={register({ required: true })}
          />

        <label htmlFor='title' className='form-text'>
          Title
        </label>
        <input
          type='text'
          name='title'
          aria-invalid={errors.title ? 'true' : 'false'}
          defaultValue={isNew ? '' : todo.title}
          ref={register({ required: true })}
        />
        <label htmlFor='description' className='form-text'>
          Description
        </label>
        <input
          type='text'
          name='description'
          defaultValue={isNew ? '' : todo.description}
          ref={register}
        />
        <label htmlFor='assignee' className='form-text'>
          Assigned To
        </label>
        <select name='assignee' ref={register}>
          {users.map((user) => (
            <option
              key={user.id}
              //  this next line of code will show a warning in the console, because we are using selected instead of defaultvalue
              selected={isNew ? '' : user.id === todo.assignee.id}
              value={user.id}
            >
              {`${user.firstName} ${user.lastName}`}
            </option>
          ))}
        </select>
        <label htmlFor='done'>Done</label>
        <input
          type='checkbox'
          name='done'
          defaultChecked={isNew ? '' : todo.done}
          ref={register}
        />
        <div>
          {/* if there is an error in title or deadline these errors with show up. && is used as "if true"  */}
          {errors.deadline && <span role='alert'>Deadline is required</span>}
          {errors.title && <span role='alert'>Title is required</span>}
          <button type='submit' className='btn btn-success'>Save</button>
        </div>
      </form>
    </Fragment>
  );
};

export default TodoForm;
