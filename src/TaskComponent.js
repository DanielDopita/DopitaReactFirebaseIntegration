import React, { useState, useEffect } from "react";

const TaskComponent = ({ task, tasks, onDeleteTask }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSorted, setIsSorted] = useState(false);
  const [displayedTasks, setDisplayedTasks] = useState([]);

  useEffect(() => {
    let result = [...tasks];
    
    if (searchTerm) {
      result = result.filter(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    if (isSorted) {
      result = [...result].sort();
    }
    
    setDisplayedTasks(result);
  }, [tasks, searchTerm, isSorted]);

  return (
    <div className="task-component">
      <h3>Random Task: {task || "No tasks available"}</h3>
      
      <div className="task-controls">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="task-search"
        />
        <button 
          onClick={() => setIsSorted(!isSorted)} 
          className="sort-button"
          disabled={displayedTasks.length <= 1}
        >
          {isSorted ? "Unsort" : "Sort A-Z"}
        </button>
      </div>

      <ul className="task-list">
        {displayedTasks.map((task, index) => (
          <li key={index}>
            <span>{task}</span>
            <button 
              onClick={() => onDeleteTask(index)}
              className="delete-button"
              aria-label={`Delete task: ${task}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskComponent;