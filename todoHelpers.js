const todoNameInput = document.getElementById('todoName');
const todoDueDateInput = document.getElementById('todoDueDate');
const addTodoButton = document.getElementById('addBtn');
const errorAlert = document.getElementById('error-alert');
const todoTable = document.getElementById('todo-table');
const deleteAllBtn = document.getElementById("delete-all")
const filterLabel = document.querySelector('label[for="filter-select"]');


const todos = [];
    
const addTodo = () => {
    const todoName = todoNameInput.value;
    const todoDueDate = todoDueDateInput.value;

    if (!todoName || !todoDueDate) {
        errorAlert.style.display = 'block';
        return;
    }

    const todo = {
        name: todoName,
        dueDate: todoDueDate,
        completed: false
    };

    todos.push(todo);
    todoNameInput.value = "";
    todoDueDateInput.value = "";
    errorAlert.style.display = 'none';
    displayTodos();
};

const displayTodos = (data = []) => {
    todoTable.innerHTML = '';
    const newTodos = data.length ? data : todos;
    newTodos.forEach((todo, index) => {
        const todoRow = document.createElement('tr');
        todoRow.innerHTML = `
            <td>${todo.name}</td>
            <td>${new Date(todo.dueDate).toLocaleString()}</td>
            <td>${todo.completed ? 'Completed' : 'Pending'}</td>
            <td style="display:flex, gap:1rem">
                <img src="./images/checkmark.png" onclick="deleteTodo(${index})"  style="cursor: pointer; width: 20px; height: 20px;"/>
                <img src="./images/delete_8847462.png" onclick="deleteTodo(${index})"  style="cursor: pointer; width: 20px; height: 20px;"/>
                <img src="./images/pen_211744.png" onclick="editTodo(${index})"  style="cursor: pointer; width: 20px; height: 20px;"/>
            </td>
        `;
        todoTable.appendChild(todoRow);
    });
};


const editTodo = (index) => {
    const todo = todos[index];
    todoNameInput.value = todo.name;
    todoDueDateInput.value = todo.dueDate;
    deleteTodo(index);
}

const filterTodos = (status) => {
    let filteredTodos = [];
    if(status === 'all') {
        filteredTodos = todos;
    } else if(status === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed === true);
    } else if(status === 'pending') {
        filteredTodos = todos.filter(todo => todo.completed === false);
    } else {
        filteredTodos = todos;
    }
    displayTodos(filteredTodos);
}

const toggleCompleted = (index) => {
    todos[index].completed = !todos[index].completed;
    displayTodos();
};

const deleteTodo = (index) => {
    todos.splice(index, 1);
    displayTodos();
};

const deleteAllTodos = () => {
    todos.splice(0, todos.length);
    displayTodos();
};

const filterSelect = document.getElementById('filter-select');
filterSelect.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    filterTodos(selectedValue);
});
deleteAllBtn.addEventListener('click', deleteAllTodos);
addTodoButton.addEventListener('click', addTodo);
