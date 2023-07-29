/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './App.css';

const TodoItem = ({ todo, index, markAsDone, deleteTodo, updateTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (editedText.trim() !== '') {
      updateTodo(index, editedText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedText(todo.text);
  };

  return (
    <div className="todo-item">
      <div className="todo-text">
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        ) : (
          <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
            {todo.text}
          </span>
        )}
      </div>
      <div>
        {!isEditing && (
          <>
            <button
              className={`done-btn ${todo.done ? 'done' : ''}`}
              onClick={() => markAsDone(index)}
            >
              <i className={`fas ${todo.done ? 'fa-undo' : 'fa-check-circle'}`}></i>
            </button>
            <button className="edit-btn" onClick={handleEdit}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="delete-btn" onClick={() => deleteTodo(index)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </>
        )}
        {isEditing && (
          <>
            <button className="update-btn" onClick={handleUpdate}>
              <i className="fas fa-save"></i>
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              <i className="fas fa-times"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const App = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [inputValue, setInputValue] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = { text: inputValue, done: false };
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setInputValue('');
    }
  };

  const markAsDone = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;
    setTodos(updatedTodos);
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const updateTodo = (index, newText) => {
    const updatedTodos = [...todos];
    updatedTodos[index].text = newText;
    setTodos(updatedTodos);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  const showPendingTodos = () => {
    setShowCompleted(false);
    setShowPending(true);
  };

  const showCompletedTodos = () => {
    setShowCompleted(true);
    setShowPending(false);
  };

  const showAllTodos = () => {
    setShowCompleted(false);
    setShowPending(false);
  };

  const filteredTodos = showCompleted
    ? todos.filter((todo) => todo.done)
    : showPending
    ? todos.filter((todo) => !todo.done)
    : todos;

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="tabs">
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='Add a new todo...'
        onKeyPress={handleKeyPress}
      />
      <button onClick={showAllTodos}>All</button>
        <button onClick={showPendingTodos}>Show Pending</button>
        <button onClick={showCompletedTodos}>Show Completed</button>
        <hr />
      {filteredTodos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          index={index}
          markAsDone={markAsDone}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </div>
  );
};

export default App;