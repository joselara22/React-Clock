import { useEffect, useState } from "react"

function Todo() {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const [tasks, setTasks] = useState(savedTasks);
  const [task, setTask] = useState('');

  // Update local storage when todo list changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks])

  const onChange = (e) => {
    setTask(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (task.trim() !== '') {
      setTasks((prevState) => [...prevState, task]);
      setTask('')
    }
  }

  const onTaskClick = (index) => {
    setTasks((prevState) => prevState.filter((task, i) => i !== index));
  }

  return (
    <div className="todo-list">
      <p>To Do</p>
      <div className="input">
        <form onSubmit={onSubmit}>
          <input onChange={onChange} type="text" id="task" placeholder="Enter Task" value={task} />
          <button type="submit">Add</button>
        </form>
      </div>
      {tasks.length > 0 ? <ul className="tasks">
        {tasks.map((task, index) => (
          <li onClick={() => onTaskClick(index)} key={index}>{task}</li>
        ))}
      </ul> : 'Take a break!'}
      
    </div>
  )
}

export default Todo