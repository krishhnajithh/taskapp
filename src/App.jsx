// src/App.jsx
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";



function App() {
  const [user, setUser] = useState(null);
  const [allTasks, setAllTasks] = useState({}); // { username: [ { id, text } ] }

  const handleLogin = (credentials) => {
    setUser({
      username: credentials.username,
      role: credentials.role,
    });
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
      />
    );
  }

  if (user.role === "admin") {
    return <AdminDashboard allTasks={allTasks} />;
  }

  return <div>Invalid role</div>;
}

export default App;