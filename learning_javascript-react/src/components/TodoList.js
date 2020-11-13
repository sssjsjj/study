import React from 'react'
import TodoListItem from './TodoListItem'
import './TodoList.css'

// App.js에서 받은 props : todos
const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle}></TodoListItem>
      ))}
    </div>
  )
}

export default TodoList