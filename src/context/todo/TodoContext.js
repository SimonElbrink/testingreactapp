/* The context is a JavaScript object that sets up and make it possible for differnet components throughout 
the application to accesss a common state */

import { createContext } from 'react';

const todoContext = createContext();

export default todoContext;
