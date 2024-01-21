/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
import React, { useContext } from "react";
import { Context } from "./context";

const TasksFilter = () => {
  const { filter, onFilterChange } = useContext(Context);

  const buttons = [
    { name: "All", label: "All" },
    { name: "Active", label: "Active" },
    { name: "Completed", label: "Completed" }
  ];

  const elements = buttons.map(({ name, label }) => {
    const isActive = filter === name;
    const classActive = isActive ? "selected" : "";

    return (
      <li key={name}>
        <button
          className={classActive}
          type="button"
          onClick={() => onFilterChange(name)}
        >
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{elements}</ul>;
};

export default TasksFilter;
