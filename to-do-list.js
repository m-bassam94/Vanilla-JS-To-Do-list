counter = 0

class Task {
    constructor(text) {
        this.text = text
        this.checked = false
        this.id = counter
        counter++
    }
}

class TaskList {
    constructor() {
        this.array = new Array
    }
    addTask(task) {
        this.array.push(task)
    }
    removeTask(id) {
        this.array.every((task, index) => {
            if (task.id == id) {
                this.array.splice(index, 1)
                return false
            }
            return true
        })
    }
    getTask(id) {
        var e
        this.array.every((task) => {
            if (task.id == id) {
                e = task
                return false
            }
            return true
        })
        return e
    }
}

var list = new TaskList
var doneList = new TaskList

const newTask = document.getElementById("new-task")
const btn = document.getElementById("add-task")
const toDoTasks = document.getElementById("toDoTasks")
const doneTasks = document.getElementById("doneTasks")

function taskEntry(t) {
    return `<li><input type="checkbox" data-id=${t.id} onchange=onCheck(this) >` +
        `<span>${t.text}</span>` + `<button data-id=${t.id} onclick=onDelete(this)>Delete</button></li>`
}
function doneTaskEntry(t) {
    return `<li><input type="checkbox" data-id=${t.id} onchange=unCheck(this) checked>` +
        `<span><del>${t.text}</del></span>` + `<button data-id=${t.id} onclick=doneDelete(this)>Delete</button></li>`
}

function onCheck(checkbox) {
    var id = checkbox.dataset.id
    toDoTasks.removeChild(checkbox.parentNode)
    let task = list.getTask(id)
    list.removeTask(id)
    update_LocalStorage(list.array)
    doneList.addTask(task)
    update_Done_LocalStorage(doneList.array)
    var row = doneTaskEntry(task)
    doneTasks.innerHTML += row
}
function unCheck(checkbox) {
    var id = checkbox.dataset.id
    doneTasks.removeChild(checkbox.parentNode)
    let task = doneList.getTask(id)
    doneList.removeTask(id)
    update_Done_LocalStorage(doneList.array)
    list.addTask(task)
    update_LocalStorage(list.array)
    // Error
    var row = taskEntry(task)
    toDoTasks.innerHTML += row
}
function onDelete(button) {
    var id = button.dataset.id
    toDoTasks.removeChild(button.parentNode)
    list.removeTask(id)
    update_LocalStorage(list.array)

}
function doneDelete(button) {
    var id = button.dataset.id
    doneTasks.removeChild(button.parentNode)
    doneList.removeTask(id)
    update_Done_LocalStorage(doneList.array)
}
/*************************************************/
if (!localStorage.stored) {
    update_LocalStorage(list.array)
} else {
    list.array = JSON.parse(localStorage.stored)
    for (let i = 0; i < list.array.length; i++) {
        let task = list.array[i]
        let row = taskEntry(task)
        toDoTasks.innerHTML += row
    }
}

if (!localStorage.doneStored) {
    update_Done_LocalStorage(doneList.array)
} else {
    doneList.array = JSON.parse(localStorage.doneStored)
    for (let i = 0; i < doneList.array.length; i++) {
        let task = doneList.array[i]
        let row = doneTaskEntry(task)
        doneTasks.innerHTML += row
    }
}
/********************************************** */
function update_LocalStorage(arr) {
    localStorage.stored = JSON.stringify(arr)
}

function update_Done_LocalStorage(arr) {
    localStorage.doneStored = JSON.stringify(arr)
}
/*************************************************/
btn.onclick = (e) => {
    e.preventDefault();
    var taskText = newTask.value
    let task = new Task(taskText)
    list.addTask(task)
    update_LocalStorage(list.array)
    var row = taskEntry(task)
    toDoTasks.innerHTML += row

    newTask.value = ""
}