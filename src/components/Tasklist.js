import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';

const TaskList = ({ tasks, deleteTask, checkedTask }) => {
  // Recursive method created to measure minutes and hours
  const Trim = (elapsed) => {
    if (elapsed >= 60) {
      return Trim(elapsed - 60);
    }
    return elapsed;
  };

  // Method displaying duration of tasks realtime
  const measureTime = (startTime, done, durationTime) => {
    if (done) {
      const diff = durationTime;
      const hours = Math.floor(diff / 3600000);
      const minutes = Trim((diff / 60000).toFixed(0));
      const seconds = Trim((diff / 1000).toFixed(0));
      return String(`${hours} hours ${minutes} minutes ${seconds} seconds`);
    }
    const diff = Date.now() - startTime + durationTime;
    const hours = Math.floor(diff / 3600000);
    const minutes = Trim((diff / 60000).toFixed(0));
    const seconds = Trim((diff / 1000).toFixed(0));
    return String(`${hours} hours ${minutes} minutes ${seconds} seconds`);
  };

  return (
    <List>
      {tasks.map((task, index) => (
        <ListItem key={index.toString()}>
          <Checkbox
            tabIndex={-1}
            disableRipple
            onClick={() => {
              checkedTask(index);
            }}
            checked={task[2]}
          />
          <ListItemText
            primary={task[0]}
            secondary={measureTime(task[1], task[2], +task[3])}
          />
          <ListItemSecondaryAction>
            <IconButton
              aria-label="Delete"
              onClick={() => {
                deleteTask(index);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.array).isRequired,
  deleteTask: PropTypes.func.isRequired,
  checkedTask: PropTypes.func.isRequired,
};
