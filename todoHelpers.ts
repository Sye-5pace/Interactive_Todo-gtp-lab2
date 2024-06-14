import { Todo } from './interface'

const todoNameInput = document.getElementById('todoName') as HTMLInputElement;
const todoDueDateInput = document.getElementById('todoDueDate') as HTMLInputElement;
const addTodoButton = document.getElementById('addBtn') as HTMLButtonElement;
const errorAlert = document.getElementById('error-alert') as HTMLElement;
const todoTable = document.getElementById('todo-table') as HTMLTableElement;
const deleteAllBtn = document.getElementById('delete-all') as HTMLButtonElement;
const filterLabel = document.querySelector('label[for="filter-select"]') as HTMLLabelElement;
const filterSelect = document.getElementById('filter-select') as HTMLSelectElement;

let todos: Todo[] = [];
const validateInput = (): void =>{
    const todoName = todoNameInput.value.trim();
    const todoDueDate = todoDueDateInput.value;
    errorAlert.style.display = (!todoName || !todoDueDate) ? 'block' : 'none';
}

const addTodo = (): void => {
    const todoName = todoNameInput.value;
    const todoDueDate = todoDueDateInput.value;

    if (!todoName || !todoDueDate) {
        errorAlert.style.display = 'block';
        return;
    }

    const todo: Todo = {
        name: todoName,
        dueDate: todoDueDate,
        completed: false
    };

    todos.push(todo);
    clearInputs();
    errorAlert.style.display = 'none';
    displayTodos();
}

const clearInputs= (): void => {
    todoNameInput.value = '';
    todoDueDateInput.value = '';
}

const createTodoRow = (todo: Todo, index: number): HTMLTableRowElement => {
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

const displayTodos = (data: Todo[] = []): void => {
    todoTable.innerHTML = '';
    const newTodos = data.length ? data : todos.slice();
    newTodos.forEach((todo, index) => {
        const todoRow = createTodoRow(todo, index);
        todoTable.appendChild(todoRow);
    });
}

const editTodo = (index: number): void => {
    const todo = todos[index];
    todoNameInput.value = todo.name;
    todoDueDateInput.value = todo.dueDate;
    deleteTodo(index);
}

const filterTodos = (status: string): void => {
    let filteredTodos: Todo[] = [];
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

// const toggleCompleted = (index: number): void => {
//     todos[index].completed = !todos[index].completed;
//     displayTodos();
// }

const deleteTodo = (index: number): void => {
    todos.splice(index, 1);
    displayTodos();
}

const deleteAllTodos = (): void => {
    todos = [];
    displayTodos();
}

filterLabel.addEventListener('click', () => {
    filterSelect.style.display = filterSelect.style.display === 'none' ? 'block' : 'none';
});

filterSelect.addEventListener('change', (event) => {
    const selectedValue = (event.target as HTMLSelectElement).value;
    console.log(`Selected filter: ${selectedValue}`);
    filterTodos(selectedValue);
});

todoNameInput.addEventListener('input', validateInput);
todoDueDateInput.addEventListener('input', validateInput);
deleteAllBtn.addEventListener('click', deleteAllTodos);
addTodoButton.addEventListener('click', addTodo);
displayTodos()
