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
    case 'SET_TODOS':
      return action.todos;

    case 'ADD_TODO':
      if (action.text.trim() !== '') {
        const newTodo = { text: action.text, done: false };
        return [...state, newTodo];
      }
      return state;

    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        index === action.index ? { ...todo, done: !todo.done } : todo
      );

    case 'DELETE_TODO':
      return state.filter((_, i) => i !== action.index);

    case 'UPDATE_TODO':
      return state.map((todo, index) =>
        index === action.index ? { ...todo, text: action.text } : todo
      );

    default:
      return state;
  }
};

const App = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      dispatch({ type: 'SET_TODOS', todos: JSON.parse(storedTodos) });
    }
  }, []);

  const [inputValue, setInputValue] = useState('');
  const [showCompleted, setShowCompleted] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch({ type: 'ADD_TODO', text: inputValue });
      setInputValue('');
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
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo..."
        onKeyPress={handleKeyPress}
      />
      <div className="tabs">
        <button onClick={showAllTodos}>All</button>
        <button onClick={showPendingTodos}>Show Pending</button>
        <button onClick={showCompletedTodos}>Show Completed</button>
      </div>
      <hr />
      {filteredTodos.map((todo, index) => (
        <TodoItem key={index} todo={todo} index={index} dispatch={dispatch} />
      ))}
    </div>
  );
};

export default App;
