import React from 'react';
import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div>
    <h1>Not Found</h1>
    <p>
      <Link to="/hello" href="/hello">Go to hello</Link>
    </p>
  </div>
);

export default NotFound;
