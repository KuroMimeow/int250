//helper function
//load web
document.addEventListener("DOMContentLoaded", renderTasks);




//save task
export function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks))
}

// load task 
export function loadTasks() {
    console.log("Load 'tasks...")
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

//edit
let editTaskId = null;

const editTaskInput = document.getElementById('editTaskInput');
const editLevelInput = document.querySelector('input[name="priority2"]:checked');
const saveEditBtn = document.getElementById('BtnSaveChange');


//add
const input = document.getElementById('exampleInputEmail1')
const btnAdd = document.getElementById('addBtn')

let tasks = []

btnAdd.addEventListener("click", (e) => {
    e.preventDefault()
    if (!input.value.trim()) return;

    const levelInput = document.querySelector('input[name="priority"]:checked');
    if (!levelInput) return;

    tasks = loadTasks();

    const newTask = {
        id: tasks.length === 0 ? 1 : tasks[tasks.length - 1].id + 1,
        task: input.value,
        level: levelInput.value,
        active: 1
    };

    tasks.push(newTask);
    saveTasks(tasks);

    input.value = "";
    renderTasks();
})

//create li from localstorage
const ulx = document.querySelector("#ex1-tabs-1 ul")

function renderTasks(option = "") {
    let tasks = []
    if (option === 1) {
        tasks = loadTasks()
        let Alt = tasks.filter((t) => t.active === 1)
        tasks = Alt
    }
    else if (option === 2) {
        tasks = loadTasks()
        let Alt = tasks.filter((t) => t.active === 0)
        tasks = Alt
    }
    else {
        tasks = loadTasks()
    }

    tasks = sortBySearchPriority(tasks);

    ulx.innerHTML = "";

    tasks.forEach(t => {
        //li
        const li = document.createElement("li")
        li.classList.add(
            "list-group-item",
            "d-flex",
            "align-items-center",
            "rounded",
            "mb-2",
            `priority-${t.level}`
        );
        li.style.justifyContent = 'space-between'

        const div1 = document.createElement('div')

        const keyword = searchInput.value.toLowerCase().trim();
        // highlight
        if (keyword && t.task.toLowerCase().includes(keyword)) {
            li.classList.add('highlight');
        }

        //checkbox
        const checkbox = document.createElement('input')
        checkbox.type = "checkbox";
        checkbox.classList.add("form-check-input", "me-2");
        checkbox.checked = t.active === 0;

        // text
        const span = document.createElement("span");
        span.textContent = t.task;

        if (t.active === 0) {
            span.style.textDecoration = "line-through"
        }

        // checkbox change → update localStorage
        checkbox.addEventListener("change", () => {
            t.active = checkbox.checked ? 0 : 1;
            saveTasks(tasks);
            renderTasks();
        });

        // edit & delete task
        const div2 = document.createElement('div')
        div2.classList.add(
            "d-grid",
            "gap-2",
            "d-md-flex",
            "justify-content-md-end"
        )

        //edit
        const editBtn = document.createElement('button')
        editBtn.classList.add(
            "btn",
            "btn-warning"
        );
        editBtn.type = 'button'
        editBtn.textContent = "edit"
        editBtn.style.setProperty('--bs-btn-padding-y', '.25rem');
        editBtn.style.setProperty('--bs-btn-padding-x', '.5rem');
        editBtn.style.setProperty('--bs-btn-font-size', '.75rem');


        editBtn.addEventListener('click', () => {
            editTaskId = t.id;

            editTaskInput.value = t.task;

            document
                .querySelectorAll('input[name="priority2"]')
                .forEach(radio => {
                    radio.checked = radio.value === t.level;
                });

            const modal = new bootstrap.Modal(
                document.getElementById('editModal')
            );
            modal.show();
        });

        //delete
        const delBtn = document.createElement('button')
        delBtn.classList.add(
            "btn",
            "btn-danger"
        )
        delBtn.type = 'button'
        delBtn.textContent = 'delete'
        delBtn.style.setProperty('--bs-btn-padding-y', '.25rem');
        delBtn.style.setProperty('--bs-btn-padding-x', '.5rem');
        delBtn.style.setProperty('--bs-btn-font-size', '.75rem');

        delBtn.addEventListener('click', () => {
            deleteTask(t.id);
        });

        div2.appendChild(editBtn);
        div2.appendChild(delBtn);
        div1.appendChild(checkbox);
        div1.appendChild(span);
        li.appendChild(div1)
        li.appendChild(div2)
        ulx.appendChild(li);

    })

    setTimeout(() => {
        document.querySelectorAll('.highlight')
            .forEach(el => el.classList.remove('highlight'));
    }, 2000);

    updateAll();
}

//task counter
//all
function updateAll() {
    const tasks = loadTasks()

    const total = tasks.length;
    const active = tasks.filter(t => t.active === 1).length;
    const complete = tasks.filter(t => t.active === 0).length;

    const all = document.querySelector('#ex1-tab-1 h6')
    all.textContent = total;

    const activeTask = document.querySelector('#ex1-tab-2 h6')
    activeTask.textContent = active;

    const completeTask = document.querySelector('#ex1-tab-3 h6')
    completeTask.textContent = complete;

    //clear complete all
    const clearBtn = document.getElementById('clear-button')
    clearBtn.addEventListener("click", () => {

        let completeActive = tasks.filter(t => t.active === 1)
        saveTasks(completeActive)
        loadTasks(completeActive)
        renderTasks()

    })
}

//decoration tab
const activeTab = document.getElementById('ex1-tab-2')
const completeTab = document.getElementById('ex1-tab-3')
const allTab = document.getElementById('ex1-tab-1')

activeTab.addEventListener('click', () => {
    renderTasks(1)
})

completeTab.addEventListener('click', () => {
    renderTasks(2)
})

allTab.addEventListener('click', () => {
    renderTasks()
})

// delete task
function deleteTask(id) {
    let tasks = loadTasks();
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
    renderTasks();
}

// save edit button
saveEditBtn.addEventListener("click", () => {
    if (!editTaskInput.value.trim()) return;

    const levelInput = document.querySelector('input[name="priority2"]:checked');
    if (!levelInput) return;

    let tasks = loadTasks();
    const target = tasks.find(t => t.id === editTaskId);

    if (!target) return;

    target.task = editTaskInput.value;
    target.level = levelInput.value;

    saveTasks(tasks);
    renderTasks();

    bootstrap.Modal
        .getInstance(document.getElementById('editModal'))
        .hide();
})


//search
const searchInput = document.getElementById('searchInput');
function sortBySearchPriority(tasks) {
    const keyword = searchInput.value.toLowerCase().trim();
    if (!keyword) return tasks;

    const matched = [];
    const unmatched = [];

    tasks.forEach(task => {
        if (task.task.toLowerCase().includes(keyword)) {
            matched.push(task);
        } else {
            unmatched.push(task);
        }
    });


    return [...matched, ...unmatched];

}

document.getElementById('button-addon2')
    .addEventListener('click', () => {
        renderTasks();
        searchInput.value = "";
    });

