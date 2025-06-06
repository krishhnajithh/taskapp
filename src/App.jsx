// src/App.jsx
import { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [allTasks, setAllTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : {};
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(allTasks));
  }, [allTasks]);

  const handleLogin = (credentials) => {
    // If it's a new admin login, don't create a task entry
    if (credentials.role === "admin") {
      setUser({
        username: credentials.username,
        role: credentials.role,
      });
    } else {
      // For regular users, initialize their tasks if they don't exist
      setUser({
        username: credentials.username,
        role: credentials.role,
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
  };

  const updateUserTasks = (username, tasks) => {
    setAllTasks(prev => ({ ...prev, [username]: tasks }));
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

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

  return <div>Invalid role</div>;
}

export default App;