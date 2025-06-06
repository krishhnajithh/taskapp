import React, { useState } from "react";

const UserDashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Hailee Frami", status: "In Progress" },
    // { id: 2, text: "Franco Hartmann PhD", status: "In Progress" },
    // { id: 3, text: "Prof. Gerald Dare MD", status: "In Progress" },
    // { id: 4, text: "Sim Gutmann", status: "Completed" },
    // { id: 5, text: "Dr. Wilson Moore III", status: "In Progress" },
    // { id: 6, text: "Ari Daniel", status: "Completed" },
    // { id: 7, text: "Kacie Nolan Jr.", status: "In Progress" },
    // { id: 8, text: "Our new task", status: "In Progress" }
  ]);

  const handleStatusChange = (id, newStatus) => {
    const updated = tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(updated);
  };

  const handleEdit = (id) => {
    alert(`Edit feature for task ID ${id} can be implemented here.`);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Tasks</h2>
      {/* <button style={styles.createBtn}>Create Task</button> */}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Task</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id} style={styles.tr}>
              <td style={styles.td}>{task.text}</td>
              <td style={styles.td}>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  style={styles.select}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(task.id)} style={styles.editBtn}>View</button>
                {/* <button onClick={() => handleDelete(task.id)} style={styles.deleteBtn}>Delete</button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: "10px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh"
  },
  heading: {
    fontSize: "24px",
    marginBottom: "20px"
  },
  createBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "8px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "10px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#fff"
  },
  th: {
    textAlign: "left",
    padding: "5px",
    borderBottom: "2px solid #ddd"
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #eee"
  },
  tr: {
    transition: "background-color 0.2s"
  },
  select: {
    padding: "6px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  editBtn: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "3px",
    border: "none",
    borderRadius: "2px",
    marginRight: "4px",
    cursor: "pointer"
  },
  deleteBtn: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "6px 12px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default UserDashboard;
