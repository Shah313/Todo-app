import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

/* import { useState } from "react";
 */
import { removeDataFromLocalStorage } from "../LocalStorage";

function TodoBox({
  todoItems,
  setEditingTodo,
  setIsShown,
  setTodoItems,
  filter,
  completed,
  setCompleted,
  timeString,
}) {
  function handleDelete(todo) {
    setTodoItems(todoItems.filter((item) => item !== todo));
    removeDataFromLocalStorage(todoItems.filter((item) => item !== todo));
  }

  function handleCheck(todo) {
    if (completed.includes(todo)) {
      setCompleted(completed.filter((item) => item !== todo));
      localStorage.setItem(
        "completed",
        JSON.stringify(completed.filter((item) => item !== todo))
      );
    } else {
      setCompleted([...completed, todo]);
      localStorage.setItem("completed", JSON.stringify([...completed, todo]));
    }
  }

  function handleEdit(todo) {
    setIsShown(true);
    setEditingTodo(todo);
  }

  return (
    <>
      <div className="contentWrapper">
        {todoItems.length === 0 ? (
          <p className="emptyWrapper">No Todos</p>
        ) : filter === "incomplete" &&
          todoItems.filter((item) => !completed.includes(item)).length === 0 ? (
          <p className="emptyWrapper">No Todos</p>
        ) : filter === "completed" &&
          todoItems.filter((item) => completed.includes(item)).length === 0 ? (
          <p className="emptyWrapper">No Todos</p>
        ) : (
          todoItems.map((todo) => {
            if (
              filter === "all" ||
              (filter === "completed" && completed.includes(todo)) ||
              (filter === "incomplete" && !completed.includes(todo))
            ) {
              return (
                <div key={todo} className="todoItem">
                  <div className="todoItemCheckBox">
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={completed.includes(todo)}
                      onChange={() => handleCheck(todo)}
                    />
                  </div>

                  <div className="todoItemTextContainer">
                    <p
                      className={`todoItemText ${
                        completed.includes(todo) ? "line-through" : ""
                      }`}
                    >
                      {" "}
                      {todo}
                    </p>
                    <p className="todoItemTime">{timeString}</p>
                  </div>

                  <div className="todoItemActions">
                    <div className="todoItemDltIcon">
                      <MdDelete onClick={() => handleDelete(todo)} />
                    </div>

                    <div className="todoItemEditIcon">
                      <MdEdit onClick={() => handleEdit(todo)} />
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })
        )}
      </div>
    </>
  );
}
export default TodoBox;