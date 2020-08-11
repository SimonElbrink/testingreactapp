import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import NotFound from './components/layout/NotFound';
import TodoAction from './context/todo/TodoAction';
import TodoForm from './components/todo/TodoForm';
import NewTodoForm from './components/todo/NewTodoForm';
import './App.css';

const App = () => {
  return (
    <TodoAction>
      <Router>
        <div className='app'>
          <Navbar />
          <div className='container'>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/newTodo' component={NewTodoForm} />
              <Route exact path='/todo/:id' component={TodoForm} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </TodoAction>
  );
};

export default App;
