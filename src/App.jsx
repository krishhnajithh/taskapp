// src/App.jsx
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Validate role when loading from localStorage
      const validRoles = ['admin', 'user'];
      if (!validRoles.includes(parsedUser.role)) {
        // If role is invalid, clear localStorage and return null
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        return null;
      }
      return parsedUser;
    }
    return null;
  });
  
  const [allTasks, setAllTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : {};
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userRole', user.role);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }, [allTasks]);

  const handleLogin = (credentials) => {
    // Validate role and provide default if invalid
    const validRoles = ['admin', 'user'];
    const role = validRoles.includes(credentials.role) ? credentials.role : 'user';

    // If it's a new admin login, don't create a task entry
    if (role === "admin") {
      setUser({
        username: credentials.username,
        role: role,
      });
    } else {
      // For regular users, initialize their tasks if they don't exist
      setUser({
        username: credentials.username,
        role: role,
      });
      
      // Initialize tasks for new users
      setAllTasks(prev => {
        if (!prev[credentials.username]) {
          return { ...prev, [credentials.username]: [] };
        }
        return prev;
      });
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    // Force immediate re-render to show login page
    window.location.reload();
  };

  const updateUserTasks = (username, tasks) => {
    setAllTasks(prev => ({ ...prev, [username]: tasks }));
  };

  // Always show login form if not logged in
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Only render dashboards for valid roles
  if (user.role === "user") {
    return (
      <UserDashboard
        username={user.username}
        tasks={allTasks[user.username] || []}
        onUpdateTasks={(tasks) => updateUserTasks(user.username, tasks)}
        onLogout={handleLogout}
      />
    );
  }

  if (user.role === "admin") {
    return (
      <AdminDashboard 
        allTasks={allTasks} 
        onLogout={handleLogout}
      />
    );
  }

  // If somehow we get an invalid role, log the user out
  handleLogout();
  return <LoginForm onLogin={handleLogin} />;
}

export default App;