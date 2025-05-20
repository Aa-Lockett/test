let nextId = 0;

const addBtn = document.getElementById('addTaskBtn');
addBtn.addEventListener('click', () => {
    const input = document.getElementById('newTaskInput');
    const text = input.value.trim();
    if (!text) return;
    createTask(text, 'todoTasks');
    input.value = '';
});

function createTask(text, containerId) {
    const task = document.createElement('div');
    task.className = 'task';
    task.textContent = text;
    task.draggable = true;
    task.id = 'task' + nextId++;
    task.addEventListener('dragstart', dragStart);
    document.getElementById(containerId).appendChild(task);
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
}

const containers = document.querySelectorAll('.task-container');
containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
    });
    container.addEventListener('drop', e => {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const task = document.getElementById(id);
        if (task) {
            container.appendChild(task);
        }
    });
});
