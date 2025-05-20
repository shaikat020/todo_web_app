const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Create a new list item
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;

    // Create a delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
        taskList.removeChild(li);
    };

    // Append span and delete button to the list item
    li.appendChild(span);
    li.appendChild(deleteBtn);

    // Add the new list item to the task list
    taskList.appendChild(li);

    // Clear the input field
    taskInput.value = '';
}

// Event listener for the Add Task button
addTaskBtn.addEventListener('click', addTask);

// Optional: Press "Enter" to add a task
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});