/* eslint-disable no-case-declarations */
/* eslint-disable react/prop-types */
import { useState, useEffect, useReducer } from 'react';
import './App.css';

const TodoItem = ({ todo, index, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = () => {
    if (editedText.trim() !== '') {
      dispatch({ type: 'UPDATE_TODO', index, text: editedText });
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
              onClick={() => dispatch({ type: 'TOGGLE_TODO', index })}
            >
              <i className={`fas ${todo.done ? 'fa-undo' : 'fa-check-circle'}`}></i>
            </button>
            <button className="edit-btn" onClick={handleEdit}>
              <i className="fas fa-edit"></i>
            </button>
            <button className="delete-btn" onClick={() => dispatch({ type: 'DELETE_TODO', index })}>
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

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      if (action.text.trim() !== '') {
        const newTodo = { text: action.text, done: false };
        return [...state, newTodo];
      }
      return state;

    case 'TOGGLE_TODO':
      const updatedTodos = [...state];
      updatedTodos[action.index].done = !updatedTodos[action.index].done;
      return updatedTodos;

    case 'DELETE_TODO':
      return state.filter((_, i) => i !== action.index);

    case 'UPDATE_TODO':
      const todosWithUpdatedText = [...state];
      todosWithUpdatedText[action.index].text = action.text;
      return todosWithUpdatedText;

    case 'SHOW_PENDING':
      return state;

    case 'SHOW_COMPLETED':
      return state;

    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, () => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const [inputValue, setInputValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch({ type: 'ADD_TODO', text: inputValue });
      setInputValue('');
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        onKeyPress={handleKeyPress}
      />
      <hr />
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default App;
