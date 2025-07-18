const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskTableBody = document.getElementById('taskTableBody');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add task function
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ 
      name: taskText, 
      status: 'Not Started',
      createdAt: new Date().toISOString()
    });
    taskInput.value = '';
    saveTasks();
    renderTasks();
  }
});

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render all tasks
function renderTasks() {
  taskTableBody.innerHTML = '';
  
  if (tasks.length === 0) {
    const emptyRow = document.createElement('tr');
    const emptyCell = document.createElement('td');
    emptyCell.colSpan = 4;
    emptyCell.className = 'text-center py-4 text-muted';
    emptyCell.textContent = 'No tasks yet. Add your first task above!';
    emptyRow.appendChild(emptyCell);
    taskTableBody.appendChild(emptyRow);
    return;
  }

  tasks.forEach((task, index) => {
    const row = document.createElement('tr');
    row.className = 'task-row';

    // Index Cell
    const indexCell = document.createElement('td');
    indexCell.textContent = index + 1;

    // Task Name Cell
    const taskCell = document.createElement('td');
    taskCell.textContent = task.name;
    if (task.status === 'Completed') {
      taskCell.classList.add('text-decoration-line-through', 'text-muted');
    }

    // Status Cell
    const statusCell = document.createElement('td');
    const select = document.createElement('select');
    select.className = `form-select form-select-sm status-select status-${task.status.toLowerCase().replace(' ', '-')}`;
    
    const statuses = ['Not Started', 'Pending', 'In Progress', 'Completed'];
    statuses.forEach(status => {
      const option = document.createElement('option');
      option.value = status;
      option.textContent = status;
      if (task.status === status) option.selected = true;
      select.appendChild(option);
    });
    
    select.addEventListener('change', () => {
      task.status = select.value;
      saveTasks();
      renderTasks(); // Re-render to update styling
    });
    statusCell.appendChild(select);

    // Action Cell
    const actionCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm';
    deleteBtn.innerHTML = '<i class="bi bi-trash"></i> Delete';
    deleteBtn.onclick = () => {
      if (confirm('Are you sure you want to delete this task?')) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      }
    };
    actionCell.appendChild(deleteBtn);

    // Append all cells to the row
    row.appendChild(indexCell);
    row.appendChild(taskCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    taskTableBody.appendChild(row);
  });
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
  renderTasks();
  
  // Allow adding tasks with Enter key
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTaskBtn.click();
    }
  });
});