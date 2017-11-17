import React from 'react';
import { Link } from 'react-router-dom';

export const Bye = () => (
  <div>
    <h1>Bye friend!</h1>
    <p>
      <Link to="/hello" href="/hello">Go to hello</Link>
    </p>
  </div>
);

export default Bye;
