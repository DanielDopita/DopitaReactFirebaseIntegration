import React, { useState } from "react";

const TaskForm = ({ onAddTask }) => {
  const [taskData, setTaskData] = useState({
    name: "",
    description: ""
  });
  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!taskData.name.trim()) newErrors.name = "Task name is required";
    // Removed description requirement
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onAddTask({
        ...taskData,
        id: Date.now() // Simple unique ID
      });
      setTaskData({ name: "", description: "" });
      setSubmissionStatus("Task added successfully!");
      setTimeout(() => setSubmissionStatus(null), 3000);
    }
  };

  return (
    <div className="task-form-container">
      <h3>Add New Task</h3>
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-group">
          <label htmlFor="name">Task Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={taskData.name}
            onChange={handleChange}
            className={errors.name ? "error" : ""}
            placeholder="Enter task name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className={errors.description ? "error" : ""}
            placeholder="Enter task description"
            rows="3"
          />
          {errors.description && (
            <span className="error-message">{errors.description}</span>
          )}
        </div>

        <button type="submit" className="submit-button">
          Add Task
        </button>

        {submissionStatus && (
          <div className="success-message">{submissionStatus}</div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;