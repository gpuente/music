import React from 'react';
import { Link } from 'react-router-dom';

export const Hello = () => (
  <div>
    <h1>Hello friend!</h1>
    <p>
      <Link to="/bye" href="/bye">Go to bye</Link>
    </p>
  </div>
);

export default Hello;
