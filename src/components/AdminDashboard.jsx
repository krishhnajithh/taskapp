import React, { useState } from 'react';
import './AdminDashboard.css';

const AdminDashboard = ({ allTasks, onLogout }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const users = Object.keys(allTasks);
  
  const totalTasks = users.reduce((acc, user) => acc + allTasks[user].length, 0);
  const completedTasks = users.reduce(
    (acc, user) => acc + allTasks[user].filter(task => task.status === 'Completed').length,
    0
  );
  const inProgressTasks = users.reduce(
    (acc, user) => acc + allTasks[user].filter(task => task.status === 'In Progress').length,
    0
  );
  const todoTasks = users.reduce(
    (acc, user) => acc + allTasks[user].filter(task => task.status === 'To Do').length,
    0
  );

  const filteredUsers = users.filter(user => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'active') {
      return allTasks[user].some(task => task.status === 'In Progress');
    }
    if (selectedFilter === 'completed') {
      return allTasks[user].every(task => task.status === 'Completed');
    }
    return true;
  });

  return (
    <div className="admin-dashboard">
      <nav className="admin-nav">
        <div className="nav-brand">
          <h1>Admin Dashboard</h1>
          <span className="admin-badge">Administrator</span>
        </div>
        <div className="nav-actions">
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </nav>

      <div className="admin-main">
        <aside className="admin-sidebar">
          <div className="sidebar-section">
            <h3>Quick Stats</h3>
            <div className="sidebar-stats">
              <div className="sidebar-stat">
                <span className="stat-label">Total Users</span>
                <span className="stat-value">{users.length}</span>
              </div>
              <div className="sidebar-stat">
                <span className="stat-label">Total Tasks</span>
                <span className="stat-value">{totalTasks}</span>
              </div>
            </div>
          </div>
          <div className="sidebar-section">
            <h3>Task Status</h3>
            <div className="sidebar-stats">
              <div className="sidebar-stat">
                <span className="stat-label">Completed</span>
                <span className="stat-value completed">{completedTasks}</span>
              </div>
              <div className="sidebar-stat">
                <span className="stat-label">In Progress</span>
                <span className="stat-value in-progress">{inProgressTasks}</span>
              </div>
              <div className="sidebar-stat">
                <span className="stat-label">To Do</span>
                <span className="stat-value todo">{todoTasks}</span>
              </div>
            </div>
          </div>
          <div className="sidebar-section">
            <h3>User Activity</h3>
            <div className="sidebar-stats">
              <div className="sidebar-stat">
                <span className="stat-label">Most Active</span>
                <span className="stat-value">
                  {users.reduce((max, user) => 
                    allTasks[user].length > (allTasks[max]?.length || 0) ? user : max
                  , users[0] || 'None')}
                </span>
              </div>
              <div className="sidebar-stat">
                <span className="stat-label">Most Completed</span>
                <span className="stat-value">
                  {users.reduce((max, user) => {
                    const completed = allTasks[user].filter(t => t.status === 'Completed').length;
                    const maxCompleted = allTasks[max]?.filter(t => t.status === 'Completed').length || 0;
                    return completed > maxCompleted ? user : max;
                  }, users[0] || 'None')}
                </span>
              </div>
            </div>
          </div>
        </aside>

        <main className="admin-content">
          <div className="content-header">
            <h2>User Management</h2>
            <div className="view-options">
              <button 
                className={`view-button ${selectedFilter === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                All Users
              </button>
              <button 
                className={`view-button ${selectedFilter === 'active' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('active')}
              >
                Active
              </button>
              <button 
                className={`view-button ${selectedFilter === 'completed' ? 'active' : ''}`}
                onClick={() => setSelectedFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="users-grid">
            {filteredUsers.map(user => (
              <div key={user} className="user-card">
                <div className="user-header">
                  <div className="user-info">
                    <h3>{user}</h3>
                    <span className="user-role">User</span>
                  </div>
                  <div className="user-stats">
                    <div className="user-stat">
                      <span className="stat-value">{allTasks[user].length}</span>
                      <span className="stat-label">Tasks</span>
                    </div>
                    <div className="user-stat">
                      <span className="stat-value completed">
                        {allTasks[user].filter(task => task.status === 'Completed').length}
                      </span>
                      <span className="stat-label">Done</span>
                    </div>
                  </div>
                </div>

                <div className="user-tasks">
                  {allTasks[user].map(task => (
                    <div key={task.id} className="task-item">
                      <div className="task-content">
                        <div className="task-info">
                          <span className="task-text">{task.text}</span>
                          <span className={`task-status ${task.status.toLowerCase().replace(' ', '-')}`}>
                            {task.status}
                          </span>
                        </div>
                        <div className="task-actions">
                          <button className="task-action-button">View Details</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
