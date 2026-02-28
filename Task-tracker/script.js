const today = new Date().toLocaleDateString();
document.getElementById("date").innerText = today;

let tasks = JSON.parse(localStorage.getItem("tasks-" + today)) || [];
let mood = localStorage.getItem("mood-" + today) || "";
let journal = localStorage.getItem("journal-" + today) || "";

const taskList = document.getElementById("taskList");
const journalInput = document.getElementById("journalInput");
const moodDisplay = document.getElementById("moodDisplay");
const productivity = document.getElementById("productivity");

journalInput.value = journal;
moodDisplay.innerText = mood ? "Selected Mood: " + mood : "";

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");

        const leftDiv = document.createElement("div");
        leftDiv.className = "task-left";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        const span = document.createElement("span");
        span.innerText = task.text;
        if (task.completed) span.classList.add("completed");

        checkbox.onchange = () => {
            tasks[index].completed = checkbox.checked;
            saveTasks();
            updateProductivity();
        };

        leftDiv.appendChild(checkbox);
        leftDiv.appendChild(span);

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "❌";
        deleteBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
            updateProductivity();
        };

        li.appendChild(leftDiv);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (!input.value.trim()) return;

    tasks.push({ text: input.value, completed: false });
    input.value = "";
    saveTasks();
    updateProductivity();
}

function saveTasks() {
    localStorage.setItem("tasks-" + today, JSON.stringify(tasks));
}

function setMood(m) {
    mood = m;
    localStorage.setItem("mood-" + today, mood);
    moodDisplay.innerText = "Selected Mood: " + mood;
}

function saveJournal() {
    localStorage.setItem("journal-" + today, journalInput.value);
    document.getElementById("saveMsg").innerText = "Saved 💗";
}

function updateProductivity() {
    renderTasks();
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    productivity.innerText = `Productivity: ${percent}% (${completed}/${total} tasks completed)`;
}

updateProductivity();