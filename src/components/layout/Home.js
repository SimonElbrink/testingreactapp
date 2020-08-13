/* Home component is used as a starting page in the application, here we import Todos that is the list of Todo objects.
We use Fragment as a way to not get unnecessary divs on the page  */

import React, { Fragment } from 'react';
import Todos from './../todo/Todos';

const Home = () => {
  return (
    <Fragment>
      <Todos />
    </Fragment>
  );
};

export default Home;
