document.addEventListener("DOMContentLoaded", () =>{
    const todoinput = document.getElementById("todo_input");
const addTaskbtn = document.getElementById("add-task-btn");
const todolist = document.getElementById("todo-list");

let task =  JSON.parse(localStorage.getItem("task"))|| [];
task.forEach(tasks => renderTask(tasks));
    

addTaskbtn.addEventListener("click", () =>{
    const taskstest = todoinput.value.trim();
    if(taskstest==="") return;

    const newtask = {
        id: Date.now(),
        text: taskstest,
        completed: false,

    };
    task.push(newtask);
    saveTask();
    renderTask(newtask);
    todoinput.value= "";
    console.log(task);
});
function renderTask(tasks){
    const li = document.createElement("li");
    li.setAttribute("data-id", tasks.id);
    if(tasks.completed) li.classList.add("completed");
    li.innerHTML = `<span>${tasks.text}</span> ;
    <button>delete</button>`;
    li.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON")return;
        tasks.completed =! tasks.completed;
        li.classList.toggle("completed");
        saveTask();
    });
    li.querySelector("button").addEventListener("click", (e) =>{
        e.stopPropagation(); //prevent toggle from firing
        task = task.filter((t) => t.id !== tasks.id);
        li.remove();
        saveTask();
    }); 
    
    todolist.appendChild(li);
    
}
function saveTask(){
    localStorage.setItem("task", JSON.stringify(task));
}
});