/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/state-in-constructor */
/* eslint-disable react/require-default-props */
/* eslint-disable no-undef */
/* eslint-disable react/sort-comp */
import React, { Component } from "react";
import PropTypes from "prop-types";

export default class NewTaskForm extends Component {
  state = {
    label: ""
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value
    });
  };

  onSubmit = (event) => {
    const { addItem } = this.props;
    const { label } = this.state;
    event.preventDefault();
    addItem(label);
    this.setState({
      label: ""
    });
  };

  render() {
    const { placeholder } = this.props;
    const { label } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder={placeholder}
          onChange={(event) => this.onLabelChange(event)}
          value={label}
        />
      </form>
    );
  }
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func,
  placeholder: PropTypes.string
};

NewTaskForm.defaultProps = {
  placeholder: "What needs to be done?"
};
