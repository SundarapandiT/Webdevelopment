const projectsEl = document.getElementById('projects');
const addProjectBtn = document.getElementById('add-project-btn');

let projects = [];  // Array to store projects

// Function to create a project object
function createProject(title) {
  return {
    title,
    tasks: [],
  };
}

// Function to display projects
function renderProjects() {
  projectsEl.innerHTML = ''; // Clear previous projects

  projects.forEach((project) => {
    const projectEl = document.createElement('div');
    projectEl.classList.add('project');

    const projectTitleEl = document.createElement('h3');
    projectTitleEl.classList.add('project-title');
    projectTitleEl.innerText = project.title;

    const tasksEl = document.createElement('ul');

    project.tasks.forEach((task) => {
      const taskEl = document.createElement('li');
      taskEl.classList.add('task');

      const taskTextEl = document.createElement('span');
      taskTextEl.innerText = task.text;

      const deadlineEl = document.createElement('span');
      deadlineEl.innerText = `deadline: ${task.deadline}`;

      const checkboxEl = document.createElement('input');
      checkboxEl.type = 'checkbox';
      checkboxEl.checked = task.completed;
      checkboxEl.addEventListener('change', () => {
        task.completed = checkboxEl.checked;
        if (task.completed) {
          taskEl.classList.add('task-completed');
        } else {
          taskEl.classList.remove('task-completed');
        }
      });

      taskEl.appendChild(checkboxEl);
      taskEl.appendChild(taskTextEl);
      taskEl.appendChild(deadlineEl);

      tasksEl.appendChild(taskEl);
    });

    projectEl.appendChild(projectTitleEl);
    projectEl.appendChild(tasksEl);

    projectsEl.appendChild(projectEl);
  });
}

// Add event listener for adding project button
addProjectBtn.addEventListener('click', () => {
    const projectTitle = prompt('Enter project title:');
    if (projectTitle) {
        projects.push(createProject(projectTitle));
        renderProjects();
    }
});


// Initial render
renderProjects();