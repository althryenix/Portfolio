let tasks = [];

if (localStorage.getItem("storedTaskList") != null) {
    tasks = JSON.parse(localStorage.getItem("storedTaskList"));
}

tasks.sort((a, b) => {
    if (a.active !== b.active) {
        return a.active ? -1 : 1;
    }

    if (b.importance - a.importance !== 0) {
        return b.importance - a.importance;
    }

    return new Date(a.dueDate) - new Date(b.dueDate);
});

const taskList = document.querySelector("#taskList");

for (let i = 0; i < tasks.length; i++) {
    createCard(i);
}

const slider = document.querySelector("#importanceRange");
const valueDisplay = document.querySelector("#valueDisplay");

slider.addEventListener("input", function () {
    valueDisplay.textContent = slider.value;
    importance = slider.value;
});

const taskTitle = document.querySelector("#taskTitle");
const taskSubtitle = document.querySelector("#taskSubtitle");
const taskBody = document.querySelector("#taskBody");
const importanceRange = document.querySelector("#importanceRange");
const dueDate = document.querySelector("#dueDate");

const confirmTask = document.querySelector("#confirmTask");
confirmTask.addEventListener("click", function () {
    let task = {
        title: taskTitle.value,
        subtitle: taskSubtitle.value,
        importance: importanceRange.value,
        dueDate: dueDate.value,
        body: taskBody.value,
        importancePoint: 100,
        active: true,
    };

    tasks.push(task);
    tasks.sort((a, b) => {
        if (a.active !== b.active) {
            return a.active ? -1 : 1;
        }

        if (b.importance - a.importance !== 0) {
            return b.importance - a.importance;
        }

        return new Date(a.dueDate) - new Date(b.dueDate);
    });
    localStorage.setItem("storedTaskList", JSON.stringify(tasks));
    updateCards();

    taskTitle.value = "";
    taskSubtitle.value = "";
    importanceRange.value = 5;
    valueDisplay.textContent = slider.value;
    dueDate.value = "";
    taskBody.value = "";
});

function createCard(i) {
    const card = document.createElement("div");
    card.className = "card mt-1";
    card.id = `card-${i}`;
    if (tasks[i].active) {
        card.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${tasks[i].title}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${tasks[i].subtitle}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">Importance: ${tasks[i].importance}</h6>
            <h6 class="card-subtitle mb-2 text-body-secondary">Due date: ${tasks[i].dueDate}</h6>
            <p class="card-text">${tasks[i].body}</p>
            <button type="button" class="card_bttn_green btn btn-success" id="complete-${i}">Complete</button>
            <button type="button" class="card_bttn_yellow btn btn-warning" id="edit-${i}">Edit</button>
            <button type="button" class="card_bttn_red btn btn-danger" id="delete-${i}">Delete</button>
        </div>
    `;
    } else {
        card.innerHTML = `
        <div class="card-body" style="background-color: #aaaaaa;">
            <h5 class="card-title"><s>${tasks[i].title}</s></h5>
            <h6 class="card-subtitle mb-2 text-body-secondary"><s>${tasks[i].subtitle}</s></h6>
            <h6 class="card-subtitle mb-2 text-body-secondary"><s>Importance: ${tasks[i].importance}</s></h6>
            <h6 class="card-subtitle mb-2 text-body-secondary"><s>Due date: ${tasks[i].dueDate}</s></h6>
            <p class="card-text"><s>${tasks[i].body}</s></p>
            <button type="button" class="card_bttn_green btn btn-success" id="complete-${i}">Relist</button>
            <button type="button" class="card_bttn_yellow btn btn-warning" id="edit-${i}">Edit</button>
            <button type="button" class="card_bttn_red btn btn-danger" id="delete-${i}">Delete</button>
        </div>
    `;
    }

    const deleteButton = card.querySelector(`#delete-${i}`);
    deleteButton.addEventListener("click", function () {
        tasks.splice(i, 1);
        tasks.sort((a, b) => {
            if (a.active !== b.active) {
                return a.active ? -1 : 1;
            }
            if (b.importance - a.importance !== 0) {
                return b.importance - a.importance;
            }
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
        localStorage.setItem("storedTaskList", JSON.stringify(tasks));
        updateCards();
    });

    const completeButton = card.querySelector(`#complete-${i}`);
    completeButton.addEventListener("click", function () {
        tasks[i].active = !tasks[i].active;
        tasks.sort((a, b) => {
            if (a.active !== b.active) {
                return a.active ? -1 : 1;
            }

            if (b.importance - a.importance !== 0) {
                return b.importance - a.importance;
            }

            return new Date(a.dueDate) - new Date(b.dueDate);
        });
        localStorage.setItem("storedTaskList", JSON.stringify(tasks));
        updateCards();
    });

    const editButton = card.querySelector(`#edit-${i}`);
    editButton.addEventListener("click", function () {
        const editConfirmButtonDiv = document.querySelector("#editConfirmButtonDiv");
        const editConfirmButton = document.createElement("button");
        editConfirmButton.type = "button";
        editConfirmButton.className = "btn btn-success";
        editConfirmButton.id = "editConfirmButton";
        editConfirmButton.innerHTML = "Confirm edit";
        editConfirmButtonDiv.appendChild(editConfirmButton);

        confirmTask.disabled = true;
        const deleteButtons = document.querySelectorAll(".card_bttn_red");
        const editButtons = document.querySelectorAll(".card_bttn_yellow");
        deleteButtons.forEach(button => button.disabled = true);
        editButtons.forEach(button => button.disabled = true);

        taskTitle.value = tasks[i].title;
        taskSubtitle.value = tasks[i].subtitle;
        taskBody.value = tasks[i].body;
        importanceRange.value = tasks[i].importance;
        valueDisplay.textContent = tasks[i].importance;
        dueDate.value = tasks[i].dueDate;

        editConfirmButton.addEventListener("click", function () {
            tasks[i].title = taskTitle.value;
            tasks[i].subtitle = taskSubtitle.value;
            tasks[i].body = taskBody.value;
            tasks[i].importance = importanceRange.value;
            tasks[i].dueDate = dueDate.value;
            tasks.sort((a, b) => {
                if (a.active !== b.active) {
                    return a.active ? -1 : 1;
                }

                if (b.importance - a.importance !== 0) {
                    return b.importance - a.importance;
                }

                return new Date(a.dueDate) - new Date(b.dueDate);
            });
            localStorage.setItem("storedTaskList", JSON.stringify(tasks));
            updateCards();

            taskTitle.value = "";
            taskSubtitle.value = "";
            importanceRange.value = 5;
            valueDisplay.textContent = slider.value;
            dueDate.value = "";
            taskBody.value = "";

            editConfirmButton.remove();
            confirmTask.disabled = false;
            deleteButtons.forEach(button => button.disabled = false);
            editButtons.forEach(button => button.disabled = false);
        });
    });

    taskList.appendChild(card);
}

function updateCards() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => createCard(index));
}
