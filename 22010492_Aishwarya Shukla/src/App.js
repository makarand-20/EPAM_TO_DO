import React, { useState } from 'react'
import "./App.css"
import Todoinput from './components/Todoinput'
import TodoList from './components/TodoList';
function App() {
  const [listTodo, setListTodo] = useState([]);
  let addList = (inputText)=>{
    if(inputText !== ' ')
      setListTodo([...listTodo, inputText]);
  }
  const deleteListItem = (key)=>{
    let newListTodo = [...listTodo];
    newListTodo.splice(key,1)
    setListTodo([...newListTodo])
  }
  return (
    <div className='main-container'>
      <div className='centre-container'>
        <Todoinput addList={addList}></Todoinput>
        <h1 className='app-heading'>TODO</h1>
        <hr></hr>
        {listTodo.map((listItem, i)=>{
          return (
            <TodoList key={i} index={i} item={listItem} deleteItem = {deleteListItem}></TodoList>
          )
        })}
      </div>
    </div>
  )
}

export default App