export const saveDataToLocalStorage = (todo) => {
    localStorage.setItem("todoItems", JSON.stringify(todo));

}



export const getDataFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem("todoItems"));
}

export const removeDataFromLocalStorage = (todo) => {
    localStorage.setItem("todoItems", JSON.stringify(todo));
}




