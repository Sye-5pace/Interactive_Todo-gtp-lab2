const todoNameInput = document.getElementById('todoName');
const todoDueDateInput = document.getElementById('todoDueDate');
const addTodoButton = document.getElementById('addBtn');
const errorAlert = document.getElementById('error-alert');
const todoTable = document.getElementById('todo-table');
const deleteAllBtn = document.getElementById("delete-all")
const filterLabel = document.querySelector('label[for="filter-select"]');
const filterSelect = document.getElementById('filter-select');


todoNameInput.addEventListener('input', () => {
    validateInput();
});

todoDueDateInput.addEventListener('input', () => {
    validateInput();
});

const validateInput = () => {
    const todoName = todoNameInput.value.trim(); // Trim leading/trailing whitespace
    const todoDueDate = todoDueDateInput.value;
    if (!todoName || !todoDueDate) {
      errorAlert.style.display = 'block';
    } else {
      errorAlert.style.display = 'none';
    }
};

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

const createTodoRow = (todo, index) => {
    const todoRow = document.createElement('tr');
    todoRow.innerHTML = `
        <td>${todo.name}</td>
        <td>${new Date(todo.dueDate).toLocaleString()}</td>
        <td>${todo.completed ? 'Completed' : 'Pending'}</td>
        <td>
            <img src="./images/checkmark.png" onclick="toggleCompleted(${index})" style="cursor: pointer; width: 20px; height: 20px;"/>
            <img src="./images/delete_8847462.png" onclick="deleteTodo(${index})" style="cursor: pointer; width: 20px; height: 20px;"/>
            <img src="./images/pen_211744.png" onclick="editTodo(${index})" style="cursor: pointer; width: 20px; height: 20px;"/>
        </td>
    `;
    return todoRow;
}


const displayTodos = (data = []) => {
    todoTable.innerHTML = '';
    const newTodos = data.length ? data : todos.slice(); // Use slice() to copy array
    newTodos.forEach((todo, index) => {
        const todoRow = createTodoRow(todo, index);
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
    switch (status) {
        case 'completed':
            filteredTodos = todos.filter(todo => todo.completed);
            break;
        case 'pending':
            filteredTodos = todos.filter(todo => !todo.completed);
            break;
        default:
            filteredTodos = todos.slice();
            break;
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

filterLabel.addEventListener('click', () => {
    const filterSelect = document.getElementById('filter-select');
    filterSelect.style.display = filterSelect.style.display === 'none' ? 'block' : 'none';
});

filterSelect.addEventListener('change', (event) => {
    const selectedValue = event.target.value;
    console.log(`Selected filter: ${selectedValue}`);
    filterTodos(selectedValue);
});
deleteAllBtn.addEventListener('click', deleteAllTodos);
addTodoButton.addEventListener('click', addTodo);
