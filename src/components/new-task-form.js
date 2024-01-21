/* eslint-disable react/no-unused-prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
import React, { useState } from "react";
import PropTypes from "prop-types";

export default function NewTaskForm({ addItem, placeholder }) {
  const [label, setLabel] = useState("");

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addItem(label);

    setLabel("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder={placeholder}
        onChange={(event) => onLabelChange(event)}
        value={label}
      />
    </form>
  );
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
  placeholder: PropTypes.string
};

NewTaskForm.defaultProps = {
  placeholder: "What needs to be done?"
};
