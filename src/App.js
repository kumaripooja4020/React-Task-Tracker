import './App.css'; // Import your CSS file
import React, { useState, useRef, useEffect } from 'react';
import TaskList from './components/TaskList';
import Button from './components/Button';

const LOCAL_STORAGE_KEY = 'todoApp.todos';

function App() {
  const [tasks, setTasks] = useState([]);
  const tasksRef = useRef();

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storedTasks) setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function addTasks() {
    let taskName = tasksRef.current.value;
    let id = Math.floor(Math.random() * 10000);
    if (taskName === '') return alert('Please Add a Task');

    setTasks(prevTodos => [
      ...prevTodos,
      { id: id, name: taskName, complete: false }
    ]);
    tasksRef.current.value = '';
  }

  function toggleTask(id) {
    const newTasks = [...tasks];
    const task = newTasks.find(task => task.id === id);
    task.complete = !task.complete;
    setTasks(newTasks);
  }

  function removeTasks() {
    const newTasks = tasks.filter(task => !task.complete);
    setTasks(newTasks);
  }

  function removeAllTasks() {
    setTasks([]);
  }

  

  return (
    <div className="container">
      <h1 className='project-title'>React Tracker</h1>
      {tasks.length === 0 ? '' : <h1 className='total-tasks'>{tasks.filter(task => !task.complete).length}</h1>}

      <div className="input-buttons-container">
        <input className='input-field' ref={tasksRef} placeholder='Add Task...' />
        <Button bgColor="#35CF79" textColor="white" onClick={addTasks} text='Add Task' />
        <Button bgColor='#1183F5' textColor='white' onClick={removeTasks} text='Remove Task' />
        <Button bgColor='#F7440B' textColor='white' onClick={removeAllTasks} text='Delete All Tasks' />
        
      </div>

      {tasks.length > 0 ? <TaskList tasks={tasks} toggleTask={toggleTask} /> : <div style={{ textAlign: 'center' }}>No tasks to show</div>}
    </div>
  );
}

export default App;
