let todos = [];
let initTask = document.querySelector('#addTaskButton');
let addTask = document.getElementById('addTask')
let addTaskContainer = document.querySelector('#addTaskContainer');
let taskInput = document.querySelector('#task');
let dueDateInput = document.getElementById('dueDate');
let todosContainer = document.getElementById('todosContainer');

const options = {
    weekday : 'long',
    year : 'numeric',
    month : 'long',
    day : 'numeric'
};

initTask.addEventListener('click',()=>{
    addTaskContainer.classList.remove('hidden');
})

function renderTodos(){
    todosContainer.innerHTML = "";

    let statusClass = "";
    todos.forEach((todo,index)=>{
        if(todo.status === 'done'){

            
            statusClass = 'bg-green-50 border-green-200'
            console.log(`StatusClass for task '${todo.task}':`, statusClass);

        }
        else if(todo.status === 'reset'){
            statusClass = "border-neutral-200";
        }
        else{
            statusClass = "border-neutral-200";
        }
        let date = new Date(todo.dueDate);
        fDate = date.toLocaleDateString('en',options)
        let div = document.createElement('div');
        div.innerHTML = `<div id="taskStatus" class="border border-violet-300 bg-violet-50 mb-3 rounded-xl p-3 ${statusClass}">        
            <p>${todo.task}</p>
            <p class=" text-[14px] font-light text-neutral-700">${fDate}</p>
            <div class="flex gap-4">
                <button id="task-completed" data-id="${index}" class="text-neutral-400 hover:text-violet-600 flex items-center gap-3 font-light mt-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0"/>
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                  </svg>
                  Mark as done
                </button>
                <button id="delete-task" data-id="${index}" class="text-neutral-400 hover:text-red-500 flex items-center gap-3 font-light mt-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                  </svg>
                  Delete
                </button>
                 <button id="reset-task" data-id="${index}" class="text-neutral-400 hover:text-red-500 flex items-center gap-3 font-light mt-2 text-sm"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/>
                    <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"/>
                    </svg>
                  Reset
                </button>
            </div>
        </div>`

   
    todosContainer.appendChild(div);
    })
    let taskCompletedbtn = document.querySelectorAll('#task-completed');
    let deleteTaskbtn = document.querySelectorAll('#delete-task');
    let resetTaskbtn = document.querySelectorAll('#reset-task');
    taskCompletedbtn.forEach((taskCompleted)=>{
        taskCompleted.addEventListener('click',(e)=>{
            let index = e.target.getAttribute('data-id')
            let todo = todos[index];
            todo.status = 'done';
            console.log(todo);
            
            // todosContainer.innerHTML = "";
            renderTodos();
        })
    })

    resetTaskbtn.forEach((resetTask)=>{
        resetTask.addEventListener('click',(e)=>{
            let index = e.target.getAttribute('data-id')
            let todo = todos[index];
            todo.status = 'reset';
            console.log(todo);
            
            renderTodos();
        })
    })

    deleteTaskbtn.forEach((btn)=>{
        btn.addEventListener('click',(e)=>{
            e.stopPropagation();
            let index = e.target.getAttribute('data-id')
            todos.splice(index,1)
            // todosContainer.innerHTML = "";
            renderTodos();
        })
    })

}

addTask.addEventListener('click',()=>{
   let task = {
    task : taskInput.value,
    dueDate : dueDateInput.value
   }
   addTaskContainer.classList.add('hidden');
   todos.push(task);
   todosContainer.innerHTML = "";
   renderTodos();


})

var el = document.getElementById('todosContainer');
new Sortable(el, {
    animation: 150,
    ghostClass: 'blue-background-class'
});
