import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://todolist-app-cbd24-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const tasksDB = ref(database, "tasks")
const inputField = document.getElementById("inputField")
const submit = document.getElementById("addToList")
const toDoList = document.getElementById("toDoList")

submit.addEventListener("click", function () {
    let task = inputField.value
    inputField.value = ""
    push(tasksDB, task)
})

onValue(tasksDB, function (snapshot) {
    if (snapshot.exists()) {
        let taskArray = Object.entries(snapshot.val())
        toDoList.innerHTML = ""
        for (let i = 0; i < taskArray.length; i++) {
            addTaskToList(taskArray[i])
        }
    } else {
        toDoList.innerHTML = "No task has added...yet"
    }
})

function addTaskToList(task) {
    let taskID = task[0]
    let taskName = task[1]
    let newEl = document.createElement('li')
    newEl.textContent = taskName

    newEl.addEventListener("dblclick", function () {
        let locationOfTask = ref(database, `tasks/${taskID}`)
        remove(locationOfTask)
    })

    toDoList.append(newEl)
}
