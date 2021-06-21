/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import TaskForm from './components/TaskForm';
import TaskList from './components/Tasklist';
import useTaskState from './hooks/useTasksState';

const App = () => {
  const { tasks, addTask, deleteTask, setTasks, checkedTask } = useTaskState(
    []
  );

  // Method to handle adding task
  const saveTaskHandler = (taskText) => {
    const trimmedText = taskText.trim();
    if (trimmedText.length > 0) {
      addTask(trimmedText);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      let tasksList = [];
      if (localStorage.getItem('tasks')) {
        tasksList = JSON.parse(localStorage.getItem('tasks'));
      }
      setTasks(tasksList);
    }, 1000);
    return () => clearInterval(interval);
  }, [setTasks]);

  return (
    <>
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2">
          TaskList
        </Typography>
        <TaskForm saveTask={saveTaskHandler} />
        <TaskList
          checkedTask={checkedTask}
          tasks={tasks}
          deleteTask={deleteTask}
        />
      </Container>
    </>
  );
};

export default App;
