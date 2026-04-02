let tasks = [];
let task_id = 1;
let editing_task_id = null;

function add_task() {
    const task_input = document.getElementById("task_input");
    const task_text = task_input.value.trim();
    if (task_text === "") return;

    const task = {
        id: task_id++,
        text: task_text,
        completed: false
    };

    tasks.push(task);
    update_task_list();
    task_input.value = "";
}

function update_task_list() {
    const task_list = document.getElementById("task_list");
    task_list.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.classList.add("task_item");

        const task_content = editing_task_id === task.id ? `<input type="text" id="editing_task_input" value="${task.text}">` : `<span class="${task.completed ? "completed_task" : ""}">${task.text}</span>`;
        const edit_icon = editing_task_id === task.id ? "&#10004;" : "&#9998;";
        const completion_icon = task.completed ? "&#10060;" : "&#10004;";

        li.innerHTML = `
        ${task_content}
        <span>
            <button onclick="edit_task(${task.id})">${edit_icon}</button>  
            <button onclick="delete_task(${task.id})">&#128465;</button> 
            <button onclick="toggle_task_completion(${task.id})">${completion_icon}</button> 
        </span> 
        `;
        task_list.appendChild(li);
    });

    update_progress();
}
