document.addEventListener("DOMContentLoaded", ()=>{
    const input = document.getElementById("todo-input")
const button = document.getElementById("addTask")
const list = document.getElementById("todo-list")

let taskList = JSON.parse(localStorage.getItem('taskList')) || [];

taskList.forEach(task =>{
    renderTask(task)
}
);

button.addEventListener('click',()=>{
    const taskText = input.value.trim();
    if(taskText === ""){
        alert("Input field cannot be empty");
        return;
    }
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    }
    taskList.push(newTask);
    saveTask();
    renderTask(newTask);
    input.value = "";
    console.log(taskList);    
})

function renderTask(task){
    const li = document.createElement('li')
    li.setAttribute('data-id', task.id);
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `;
    li.addEventListener('click', (e)=>{
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed;
        li.classList.toggle('completed');
        saveTask();
    })

    li.querySelector('button').addEventListener('click', (e)=>{
        e.stopPropagation();
        taskList = taskList.filter(t => t.id !== task.id)
        li.classList.add('fade-out');
        setTimeout(() => {
            li.remove();
        }, 300); 
        saveTask();
    })

    list.appendChild(li);
}

function saveTask(){
    localStorage.setItem('taskList', JSON.stringify(taskList))
}
})