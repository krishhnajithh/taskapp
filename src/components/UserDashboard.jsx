import React, { useState } from "react";
import "./UserDashboard.css";

const UserDashboard = ({ username, tasks: initialTasks, onUpdateTasks, onLogout }) => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState('all');

  const handleStatusChange = (id, newStatus) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
    onUpdateTasks(updated);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const newTaskObj = {
      id: Date.now(),
      text: newTask.trim(),
      status: "To Do",
      createdAt: new Date().toISOString()
    };

    const updated = [...tasks, newTaskObj];
    setTasks(updated);
    onUpdateTasks(updated);
    setNewTask("");
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingTask.text.trim()) return;

    const updated = tasks.map(task =>
      task.id === editingTask.id ? editingTask : task
    );
    setTasks(updated);
    onUpdateTasks(updated);
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      const updated = tasks.filter(task => task.id !== id);
      setTasks(updated);
      onUpdateTasks(updated);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status.toLowerCase() === filter.toLowerCase();
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'Completed').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    todo: tasks.filter(task => task.status === 'To Do').length
  };

  return (
    <div className="dashboard-container">
      <nav className="dashboard-nav">
        <div className="nav-brand">
          <h1>Task Manager</h1>
          <span className="user-badge">Welcome, {username}</span>
        </div>
        <div className="nav-actions">
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      </nav>

      <div className="dashboard-main">
        <aside className="dashboard-sidebar">
          <div className="sidebar-section">
            <h3>Task Overview</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">{stats.total}</span>
                <span className="stat-label">Total Tasks</span>
              </div>
              <div className="stat-card completed">
                <span className="stat-value">{stats.completed}</span>
                <span className="stat-label">Completed</span>
              </div>
              <div className="stat-card in-progress">
                <span className="stat-value">{stats.inProgress}</span>
                <span className="stat-label">In Progress</span>
              </div>
              <div className="stat-card todo">
                <span className="stat-value">{stats.todo}</span>
                <span className="stat-label">To Do</span>
              </div>
            </div>
          </div>
        </aside>

        <main className="dashboard-content">
          <div className="content-header">
            <h2>My Tasks</h2>
            <div className="filter-options">
              <button 
                className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              <button 
                className={`filter-button ${filter === 'to do' ? 'active' : ''}`}
                onClick={() => setFilter('to do')}
              >
                To Do
              </button>
              <button 
                className={`filter-button ${filter === 'in progress' ? 'active' : ''}`}
                onClick={() => setFilter('in progress')}
              >
                In Progress
              </button>
              <button 
                className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                onClick={() => setFilter('completed')}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="task-form-container">
            <form onSubmit={handleAddTask} className="task-form">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task..."
                className="task-input"
              />
              <button type="submit" className="add-button">Add Task</button>
            </form>
          </div>

          <div className="tasks-container">
            {filteredTasks.length === 0 ? (
              <div className="empty-state">
                <p>No tasks found. Add a new task to get started!</p>
              </div>
            ) : (
              <div className="tasks-list">
                {filteredTasks.map(task => (
                  <div key={task.id} className="task-card">
                    {editingTask?.id === task.id ? (
                      <form onSubmit={handleSaveEdit} className="edit-form">
                        <input
                          type="text"
                          value={editingTask.text}
                          onChange={(e) => setEditingTask({...editingTask, text: e.target.value})}
                          className="edit-input"
                          autoFocus
                        />
                        <div className="edit-actions">
                          <button type="submit" className="save-button">Save</button>
                          <button 
                            type="button" 
                            onClick={() => setEditingTask(null)}
                            className="cancel-button"
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="task-content">
                          <div className="task-info">
                            <h3>{task.text}</h3>
                            <span className="task-date">
                              {new Date(task.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(task.id, e.target.value)}
                            className={`status-select ${task.status.toLowerCase().replace(' ', '-')}`}
                          >
                            <option value="To Do">To Do</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                          </select>
                        </div>
                        <div className="task-actions">
                          <button 
                            onClick={() => handleEdit(task)}
                            className="edit-button"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(task.id)}
                            className="delete-button"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
