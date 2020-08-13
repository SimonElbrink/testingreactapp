/* NotFound component is used as a landing page in the application if the url doesn´t match any of our existing routes stated in App.js */
import React from 'react';

const NotFound = () => {
  return (
    <div>
      <h1>Not Found</h1>
      <p className='lead'>The page you are looking for does not exist...</p>
    </div>
  );
};

export default NotFound;
