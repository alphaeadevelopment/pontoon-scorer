import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div>
    <p>
      Welcome
    </p>
    <Link to={'/game'}>
      Start
    </Link>
  </div>
);
