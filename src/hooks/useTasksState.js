import { useState } from 'react';

export default (initialValue) => {
  const [tasks, setTasks] = useState(initialValue);

  // Method storing tasks in Local Storage
  const storeTaskInLocalStorage = (taskText) => {
    let taskList = [];
    if (localStorage.getItem('tasks') === null) {
      taskList = [];
    } else {
      taskList = JSON.parse(localStorage.getItem('tasks'));
    }
    taskList.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(taskList));
  };

  return {
    tasks,
    // Hook method to sate tasks
    setTasks,
    // Method to add task
    addTask: (taskText) => {
      const startTime = Date.now();
      const done = false;
      const durationTime = 0;
      storeTaskInLocalStorage([taskText, startTime, done, durationTime]);
      setTasks([...tasks, [taskText, startTime, done, durationTime]]);
    },
    // Method to delete task
    deleteTask: (taskIndex) => {
      const newTasks = tasks.filter((_, index) => index !== taskIndex);
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    },
    // Method to handle Checkbox component
    checkedTask: (taskIndex) => {
      const newTasks = JSON.parse(localStorage.getItem('tasks'));
      newTasks.map((_, index) => {
        if (index === taskIndex) {
          newTasks[index][2] = !newTasks[index][2];

          if (newTasks[index][2]) {
            newTasks[index][3] += Date.now() - newTasks[index][1];
            setTasks(newTasks);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
          } else {
            newTasks[index][1] = Date.now();
            setTasks(newTasks);
            localStorage.setItem('tasks', JSON.stringify(newTasks));
          }
        }
        return null;
      });
      setTasks(newTasks);
      localStorage.setItem('tasks', JSON.stringify(newTasks));
    },
  };
};
