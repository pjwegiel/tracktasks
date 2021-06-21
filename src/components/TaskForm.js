import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

const TaskForm = ({ saveTask }) => {
  const [value, setValue] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    saveTask(value);
    setValue('');
  };

  const onChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <form onSubmit={onSubmitHandler}>
      <TextField
        style={{ width: '100%' }}
        placeholder="Add task"
        onChange={onChangeHandler}
        value={value}
      />
    </form>
  );
};

export default TaskForm;

TaskForm.propTypes = {
  saveTask: PropTypes.func.isRequired,
};
