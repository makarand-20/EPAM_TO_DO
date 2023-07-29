import React, { useState } from 'react';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleInputChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index);
    setTasks(updatedTasks);
  };
 
  return (
    <div className='todo'>
      <h2>To-Do List</h2>
      <div className='input'>
        <input
          type="text"
          value={newTask}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask} className='btn'>Add</button>
      </div>
      <h2>Your Entered Tasks Are</h2>
      <div>
        {tasks.map((task, index) => (
          <div key={index} className='tasks'> 
            <div className='task'> {task}</div>
            <button className='btn' onClick={() => handleRemoveTask(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
