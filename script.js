let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Display tasks on page load
window.onload = function () {
    displayTasks();
};

// Add Task
function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({ text: taskText, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTasks();
}

// Display Tasks
function displayTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";

        const span = document.createElement("span");
        span.textContent = task.text;
        span.className = task.completed ? "completed" : "";

        // Toggle complete
        span.onclick = () => toggleComplete(index);

        // Buttons
        const btnGroup = document.createElement("div");

        const editBtn = document.createElement("button");
        editBtn.className = "btn btn-warning btn-sm me-2";
        editBtn.textContent = "Edit";
        editBtn.onclick = () => editTask(index);

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "btn btn-danger btn-sm";
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => deleteTask(index);

        btnGroup.appendChild(editBtn);
        btnGroup.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(btnGroup);

        taskList.appendChild(li);
    });
}

// Delete Task
function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// Edit Task
function editTask(index) {
    const newTask = prompt("Edit your task:", tasks[index].text);

    if (newTask !== null && newTask.trim() !== "") {
        tasks[index].text = newTask.trim();
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

// Toggle Complete
function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}