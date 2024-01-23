/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable no-console */
/* eslint-disable react/state-in-constructor */
/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import NewTaskForm from "./new-task-form";
import TaskList from "./task-list";
import Footer from "./footer";
import { Context } from "./context";

import "../style/index.css";

export default function App() {
  const [todoData, setTodoData] = useState([]);
  const [filter, setFilter] = useState("All");

  const onItemAdded = (text) => {
    const newItem = {
      id: uuidv4(),
      label: text,
      checked: false,
      editing: false,
      date: new Date()
    };
    setTodoData((prevState) => [...prevState, newItem]);
  };

  const deleteItem = (id) => {
    setTodoData((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      return [...prevState.slice(0, idx), ...prevState.slice(idx + 1)];
    });
  };

  const checkItem = (id) => {
    setTodoData((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);

      return [
        ...prevState.slice(0, idx),
        { ...prevState[idx], checked: !prevState[idx].checked },
        ...prevState.slice(idx + 1)
      ];
    });
  };

  const editItem = (id) => {
    setTodoData((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      if (!prevState[idx].editing) {
        return [
          ...prevState.slice(0, idx),
          { ...prevState[idx], editing: true },
          ...prevState.slice(idx + 1)
        ];
      }
    });
  };

  const taskCounter = () => {
    const filtered = todoData.filter((item) => item.checked === false);
    return filtered.length;
  };

  const deleteAllCompleted = () => {
    setTodoData((prevState) => {
      const completedTasks = prevState.filter((item) => item.checked === true);
      const resArr = prevState.slice();
      for (const i of completedTasks) {
        const idx = resArr.findIndex((el) => el.label === i.label);
        resArr.splice(idx, 1);
      }
      return resArr;
    });
  };

  const filteredTasks = () => {
    if (filter === "All") return todoData;
    if (filter === "Active") return todoData.filter((item) => !item.checked);
    if (filter === "Completed") return todoData.filter((item) => item.checked);
  };

  const onFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const editingChange = (id, text) => {
    setTodoData((prevState) => {
      const idx = prevState.findIndex((el) => el.id === id);
      return [
        ...prevState.slice(0, idx),
        { ...prevState[idx], editing: false, label: text },
        ...prevState.slice(idx + 1)
      ];
    });
  };

  return (
    <Context.Provider
      value={{
        deleteItem,
        checkItem,
        editItem,
        editingChange,
        onFilterChange,
        filter
      }}
    >
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm addItem={onItemAdded} />
        </header>
        <section className="main">
          <TaskList todos={filteredTasks()} />
          <Footer counter={taskCounter} deleteAll={deleteAllCompleted} />
        </section>
      </section>
    </Context.Provider>
  );
}
