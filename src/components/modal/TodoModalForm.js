

import React, { useState, useEffect } from "react";

import { IoMdClose } from "react-icons/io";

import { saveDataToLocalStorage } from "../LocalStorage";

function TodoModalForm({
  setTodoItems,
  todoItems,
  editingTodo,
  setEditingTodo,
  isShown,
  setIsShown,
  setErrorMessage,
  setSuccessMessage,
  setTime,
  completed,
  setCompleted,
}) {
  const [inputValue, setInputValue] = useState("");

  const [status, setStatus] = useState("incomplete");





  const handleClose = () => {
    setIsShown(false);
  };

  useEffect(() => {
    if (!isShown) {
      setInputValue("");
      setEditingTodo(null);
    }
  }, [isShown, setEditingTodo]);

  useEffect(() => {
    if (editingTodo) {
      setInputValue(editingTodo);
    }
  }, [editingTodo]);

  function handleSubmit(event) {
    event.preventDefault();
    setTime(new Date());
    if (editingTodo && inputValue === editingTodo) {
      setErrorMessage("No changes made");
      return;
    }
    if (inputValue.trim() === "") {
      setErrorMessage("Please enter a title");
      return;
    }
    setErrorMessage("");
    if (editingTodo) {
      const newTodoItems = todoItems.map((item) => {
        if (item === editingTodo) {
          return inputValue;
        }
        return item;
      });

      setTodoItems(newTodoItems);
      saveDataToLocalStorage(newTodoItems);

      setEditingTodo(null);
      setSuccessMessage("Update task successfully");

      if (status === "completed" && !completed.includes(inputValue)) {
        setCompleted([...completed, inputValue]);
        localStorage.setItem(
          "completed",
          JSON.stringify([...completed, inputValue])
        );
      } else if (status === "incomplete" && completed.includes(inputValue)) {
        setCompleted(completed.filter((item) => item !== inputValue));
        localStorage.setItem(
          "completed",
          JSON.stringify(completed.filter((item) => item !== inputValue))
        );
      }
    } else {
      if (status === "completed" && !completed.includes(inputValue)) {
        setCompleted([...completed, inputValue]);
        localStorage.setItem(
          "completed",
          JSON.stringify([...completed, inputValue])
        );
      }

      setTodoItems([...todoItems, inputValue]);
      saveDataToLocalStorage([...todoItems, inputValue]);

      setSuccessMessage("Added task successfully");
    }
    setInputValue("");
    setIsShown(false);
  }

  return (
    <>
      {isShown && (
        <div className="modalWrapper">
          <div className="modalContainer">
            <div className="modalCloseBtn">
              <IoMdClose onClick={handleClose} />
            </div>
            <form className="modalForm" onSubmit={handleSubmit}>
              <h1 className="modalFormTitle">
                {editingTodo ? "Update Todo" : "Add Todo"}
              </h1>

              <label htmlFor="Title">
                Title
                <input
                  type="text"
                  placeholder="add a todo"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  name="text"
                  className="title"
                />
              </label>
              <label htmlFor="Type">
                Status
                <select
                  name="status"
                  className="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">incomplete</option>
                  <option value="completed">completed</option>
                </select>
              </label>


              

              <div className="modalButtonContainer">
                <button type="submit" className="submitBtn">
                  {editingTodo ? "Update Task" : "Add Todo"}
                </button>

                <button
                  type="button"
                  className="closeBtn"
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default TodoModalForm;