// src/components/Dashboard.jsx
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Welcome, {user ? user.name : 'Guest'}!</h2>
    </div>
  );
};

export default Dashboard;
