const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>&#10003;</span>${taskText} <span class="delete">Delete</span> <span class="update">Update</span>`;
    taskList.appendChild(listItem);

    listItem.querySelector('.delete').addEventListener('click', () => {
      listItem.remove();
    });

    listItem.querySelector('.update').addEventListener('click', () => {
      const updatedTask = prompt('Update task:', taskText);
      if (updatedTask !== null && updatedTask.trim() !== '') {
        listItem.innerHTML = `<span>&#10003;</span>${updatedTask} <span class="delete">Delete</span> <span class="update">Update</span>`;
        listItem.querySelector('.delete').addEventListener('click', () => {
          listItem.remove();
        });
        listItem.querySelector('.update').addEventListener('click', () => {
          updateTask(listItem, updatedTask);
        });
        listItem.addEventListener('click', () => {
          listItem.classList.toggle('completed');
        });
      }
    });

    listItem.addEventListener('click', () => {
      listItem.classList.toggle('completed');
    });

    taskInput.value = '';
  }
}

function updateTask(listItem, updatedTask) {
  const taskText = updatedTask.trim();

  if (taskText !== '') {
    listItem.innerHTML = `<span>&#10003;</span>${taskText} <span class="delete">Delete</span> <span class="update">Update</span>`;
    listItem.querySelector('.delete').addEventListener('click', () => {
      listItem.remove();
    });
    listItem.querySelector('.update').addEventListener('click', () => {
      updateTask(listItem, taskText);
    });
    listItem.addEventListener('click', () => {
      listItem.classList.toggle('completed');
    });
  }
}

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});
