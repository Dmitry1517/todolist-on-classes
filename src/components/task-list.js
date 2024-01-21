/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from "react";
import PropTypes from "prop-types";
import Task from "./task";

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => (
    <Task
      id={item.id}
      date={item.date}
      key={item.id}
      labelText={item.label}
      checked={item.checked}
      editing={item.editing}
    />
  ));
  return <ul className="todo-list">{elements}</ul>;
};

TaskList.propTypes = {
  todos: PropTypes.array
};

export default TaskList;
