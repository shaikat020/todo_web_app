const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskTableBody = document.querySelector('#taskTable tbody');

let tasks = [];

addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText) {
    tasks.push({ name: taskText, status: 'Not Started' });
    taskInput.value = '';
    renderTasks();
  }
});

function renderTasks() {
  taskTableBody.innerHTML = '';
  tasks.forEach((task, index) => {
    const row = document.createElement('tr');

    // Index Cell
    const indexCell = document.createElement('td');
    indexCell.textContent = index + 1;

    // Task Name
    const taskCell = document.createElement('td');
    taskCell.textContent = task.name;

    // Status Dropdown
    const statusCell = document.createElement('td');
    const select = document.createElement('select');
    select.className = `status-select status-${task.status.toLowerCase().replace(' ', '-')}`;
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
      renderTasks(); // re-render to apply color classes
    });
    statusCell.appendChild(select);

    // Action Cell
    const actionCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      tasks.splice(index, 1);
      renderTasks();
    };
    actionCell.appendChild(deleteBtn);

    row.appendChild(indexCell);
    row.appendChild(taskCell);
    row.appendChild(statusCell);
    row.appendChild(actionCell);

    taskTableBody.appendChild(row);
  });
}
