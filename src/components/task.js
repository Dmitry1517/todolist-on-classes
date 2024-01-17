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
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'https://unpkg.com/date-fns/formatDistanceToNow.mjs';

export default class Task extends Component {
  state = {
    label: this.props.labelText,
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value,
    });
  };

  onSubmit = (event) => {
    const { editingChange, id } = this.props;
    const { label } = this.state;
    event.preventDefault();
    editingChange(id, label);
  };

  render() {
    const {
      id,
      date,
      labelText,
      onDeleted,
      checked,
      editing,
      onChecked,
      onEditing,
    } = this.props;
    const { label } = this.state;

    let classNames = '';
    if (checked) classNames = 'completed';
    if (editing) classNames = 'editing';

    const result = formatDistanceToNow(date, { includeSeconds: true });

    return (
      <li className={classNames}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            checked={checked}
            onChange={onChecked}
          />
          <label htmlFor={id}>
            <span className="description">{labelText}</span>
            <span className="created">created {result} ago</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={onEditing}
          />
          <button
            type="button"
            className="icon icon-destroy"
            onClick={onDeleted}
          />
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            className="edit"
            onChange={(event) => this.onLabelChange(event)}
            value={label}
          />
        </form>
      </li>
    );
  }
}

Task.propTypes = {
  id: PropTypes.number,
  labelText: PropTypes.string,
  onDeleted: PropTypes.func,
  onChecked: PropTypes.func,
  onEditing: PropTypes.func,
  editingChange: PropTypes.func,
  checked: PropTypes.bool,
  editing: PropTypes.bool,
  date: PropTypes.object,
};
