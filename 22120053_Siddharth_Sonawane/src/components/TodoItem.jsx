import React, { useState } from "react";

const TodoItem = ({ todo, onDelete, onToggleComplete, onEdit }) => {
  const [editing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleToggle = () => {
    onToggleComplete(todo.id);
  };


  const handleEditInputChange = (event) => {
    setEditedText(event.target.value);
  };

  const handleEditSubmit = () => {
    onEdit(todo.id, editedText);
    setEditing(false);
  };

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""}`}>
      <label>
        
        {editing ? (
          <input
            type="text"
            value={editedText}
            onChange={handleEditInputChange}
            onBlur={handleEditSubmit}
          />
        ) : (
          <span className="task-text">{todo.text}</span>
        )}
      </label>
      <div className="buttons">
        <button className="delete-button" onClick={handleToggle}>
          <img src="/select.png" alt="select" />
        </button>
        
        <button className="delete-button" onClick={() => onDelete(todo.id)}>
          <img src="/delete.png" alt="Delete" />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
