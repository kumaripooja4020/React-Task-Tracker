import React from 'react'


const Task = ({task, toggleTask, onToggle}) => {

    function handleToggleTask(){
        toggleTask(task.id)
    }
  return (
    < div className='task-container'>
    <div className='task-component'>
        <input type = 'checkbox' checked= {task.complete} onChange={handleToggleTask} onDoubleClick={onToggle}/>
        {task.name}

        </div>
      
    </div>
  )
}

export default Task