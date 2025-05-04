import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
      <div className="container">
        <h1>404 - Page Not Found</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="button">
          Return Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound; 