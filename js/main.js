
let tasksList = document.querySelector('.tasks');



window.addEventListener('load', setUsernameFromLocalStorage());
document.getElementById('todo-form').addEventListener('submit', handleFormSubmission);
document.querySelector('.username').addEventListener('keypress', handleKeyPress);



function handleFormSubmission(event) {
    event.preventDefault();
    const selectedRadioButton = document.querySelector('input[name="category-option"]:checked');
    const taskInput = document.querySelector('input[name="task"]');
    const taskDescription = taskInput.value.trim();

    if(!taskDescription) {
        alert('Please enter a task description.')
        return;
    }

    if(!selectedRadioButton) {
        alert('Please select a task type.')
        return;
    }

    const todoInfoDiv = createTaskElement(selectedRadioButton, taskDescription);
}


function createTaskElement(selectedRadioButton, taskDescription) {
    const todoInfoDiv = document.createElement('div');
    todoInfoDiv.classList.add('todo-info');

    const checkboxColorClassName = selectedRadioButton && selectedRadioButton.className === 'personal' ? 'personal' : 'business';

    todoInfoDiv.innerHTML = `
        <div class="task">
            <div class="task-description">
                <input class="${checkboxColorClassName}" type="checkbox" name="checkbox" onchange="strikeTask(this)">
                <p class="task-text">${taskDescription}</p>
            </div>
            <div class="btns">
                <button class="edit-task" onclick="editTask(this)">Edit</button>
                <button class="delete-task" onclick="deleteTask(this)">Delete</button>
            </div>
        </div>
    `;

    tasksList.appendChild(todoInfoDiv);
}

function strikeTask(checkbox) {
    const parentDiv = checkbox.closest('.task-description');
    const taskText = parentDiv.querySelector('.task-text');
    
    if(checkbox.checked) {
        taskText.classList.add('strikeout');
    } else {
        taskText.classList.remove('strikeout');
    }
}


function editTask(editButton) {
    const parentDiv = editButton.closest('.task');
    const taskDescription = parentDiv.querySelector('.task-text');
    taskDescription.setAttribute('contentEditable', 'true');

    taskDescription.focus();

    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(taskDescription);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

function deleteTask(deleteButton){
    const parentDiv = deleteButton.closest('.task');
    parentDiv.remove();
}

function handleKeyPress(event) {
    if(event.key === "Enter") {
        event.preventDefault();
        saveUsername(event.target.value);
        event.target.blur();
    }
}

function saveUsername(username){
    localStorage.setItem('username', username);
}



function setUsernameFromLocalStorage() {
    if(localStorage.getItem('username')) {
        const savedUsername = localStorage.getItem('username');
        document.querySelector(".username").value = savedUsername;
    }
}