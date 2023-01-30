import React from "react";

import { useState, useEffect } from "react";
import TodoModalForm from "../modal/TodoModalForm";

import Messages from "../messages/Messages";

import "../../App.css";
import TodoBox from "../todoBox/TodoBox";

import { getDataFromLocalStorage } from "../LocalStorage";

export default function Todo() {
  const [isShown, setIsShown] = useState(false);

  const [todoItems, setTodoItems] = useState(getDataFromLocalStorage() || []);
  const [editingTodo, setEditingTodo] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [filter, setFilter] = useState(localStorage.getItem("filter") || "all");

  const [todoTimes, setTodoTimes] = useState([]);
  const [todoDates, setTodoDates] = useState([]);

  const [completed, setCompleted] = useState(
    JSON.parse(localStorage.getItem("completed")) || []
  );

  useEffect(() => {
    const storedFilter = localStorage.getItem("filter");
    if (storedFilter) {
      setFilter(storedFilter);
    }
  }, []);

  function handleFilterChange(event) {
    setFilter(event.target.value);
    localStorage.setItem("filter", event.target.value);
  }

  useEffect(() => {
    if (!isShown) {
      setEditingTodo(null);
    }
  }, [isShown]);

  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  return (
    <>
      <section className="container">
        <p className="todoHeading">TODO List</p>

        <div className="todoWrapper">
          <div className="controls">
            <button type="button" className="btn" onClick={handleClick}>
              Add Task
            </button>

            <select
              name="filter"
              className="selectFilter"
              onChange={handleFilterChange}
              value={filter}
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>

            {isShown && (
              <TodoModalForm
                setTodoItems={setTodoItems}
                todoItems={todoItems}
                setIsShown={setIsShown}
                isShown={isShown}
                editingTodo={editingTodo}
                setEditingTodo={setEditingTodo}
                setErrorMessage={setErrorMessage}
                setSuccessMessage={setSuccessMessage}
                completed={completed}
                setCompleted={setCompleted}
                todoTimes={todoTimes}
                setTodoTimes={setTodoTimes}
                todoDates={todoDates}
                setTodoDates={setTodoDates}
              />
            )}
          </div>

          <TodoBox
            todoItems={todoItems}
            setIsShown={setIsShown}
            setEditingTodo={setEditingTodo}
            setTodoItems={setTodoItems}
            filter={filter}
            completed={completed}
            setCompleted={setCompleted}
            todoTimes={todoTimes}
            todoDates={todoDates}
          />
        </div>

        <Messages errorMessage={errorMessage} successMessage={successMessage} />
      </section>
    </>
  );
}
