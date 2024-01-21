/* eslint-disable import/extensions */
/* eslint-disable react/state-in-constructor */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import { Context } from "./context";

export default function Task({ labelText, id, date, checked, editing }) {
  const [label, setLabel] = useState(labelText);
  const { deleteItem, checkItem, editItem, editingChange } =
    useContext(Context);

  const onLabelChange = (event) => {
    setLabel(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    editingChange(id, label);
  };

  let classNames = "";
  if (checked) classNames = "completed";
  if (editing) classNames = "editing";

  const result = formatDistanceToNow(date, { includeSeconds: true });

  return (
    <li className={classNames}>
      <div className="view">
        <input
          id={id}
          className="toggle"
          type="checkbox"
          checked={checked}
          onChange={() => checkItem(id)}
        />
        <label htmlFor={id}>
          <span className="description">{labelText}</span>
          <span className="created">created {result} ago</span>
        </label>
        <button
          type="button"
          className="icon icon-edit"
          onClick={() => editItem(id)}
        />
        <button
          type="button"
          className="icon icon-destroy"
          onClick={() => deleteItem(id)}
        />
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="edit"
          onChange={(event) => onLabelChange(event)}
          value={label}
        />
      </form>
    </li>
  );
}

Task.propTypes = {
  id: PropTypes.number,
  labelText: PropTypes.string,
  checked: PropTypes.bool,
  editing: PropTypes.bool,
  date: PropTypes.object
};
