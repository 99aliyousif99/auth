import { useEffect, useState } from 'react';
import Router from 'next/router';

const DashboardPage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      Router.push('/');
    } else {
      // Decode the JWT token to get user information
      const decodedToken = JSON.parse(atob(token.split('.')[1]));

      setUser(decodedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    Router.push('/');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {user && (
        <div>
          <p>Welcome, {user.username}!</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
