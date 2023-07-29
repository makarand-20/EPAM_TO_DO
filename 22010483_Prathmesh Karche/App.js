import './App.css';
import TodoList from './components/ToDo';

function App() {
  
  let task;
  return (
    <div className='App'>
      <h1>My To-Do App</h1>
      <TodoList />
    </div>
  );
}

export default App;
