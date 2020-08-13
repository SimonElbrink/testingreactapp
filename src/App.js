/* Here we need to wrap the return objects with outr TodoAction in order for it to be available for the whole application.
we use a Switch statement that all URL run through to match, we use the exact keyword in order to only soute the URL if 
it matches the path axactly. If the URL does not match any it will fall down to NotFound that is default and will show otherwise.
if the path is found it will load corresponding component
*/

import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/layout/Home';
import NotFound from './components/layout/NotFound';
import TodoAction from './context/todo/TodoAction';
import TodoForm from './components/todo/TodoForm';
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
              <Route exact path='/todo/:id?' component={TodoForm} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </TodoAction>
  );
};

export default App;
