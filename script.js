const formElement = document.querySelector(".form");

const inputElement = document.querySelector(".input");

const ulElement = document.querySelector(".list");

let list = JSON.parse(localStorage.getItem("list"));
if (list) {
    list.forEach(task => {
        toDoList(task)
    });
}



formElement.addEventListener("submit", function(event)
{
    event.preventDefault();
    toDoList()
});

function toDoList(task){

    let newTask = inputElement.value; 
    if(task){
        newTask = task.name
    }

    

    const liElement = document.createElement("li");
    if(task && task.checked){
        liElement.classList.add("checked");
    }

    liElement.innerText = newTask;
    ulElement.appendChild(liElement);//add new element to list

    inputElement.value = "";
    
    //put check sign next to text
    const checkButtonElement = document.createElement("div");
    checkButtonElement.innerHTML = `
    <i class="fa-solid fa-check">
    `;
    liElement.appendChild(checkButtonElement);

    //put trash sign next to text
    const trashButtonElement = document.createElement("div");
    trashButtonElement.innerHTML = `
    <i class="fa-solid fa-trash">
    `;
    liElement.appendChild(trashButtonElement);

    //toggle the check sign
    checkButtonElement.addEventListener("click", function(){
        liElement.classList.toggle("checked")
        updateLocalStorage();
    });
       

    //click on trash, deletes element
    trashButtonElement.addEventListener("click", function(){
        liElement.remove();
        updateLocalStorage();
    });
    updateLocalStorage();
    
    
}

// local storage, keep data after refresh
function updateLocalStorage(){
    const liEls = document.querySelectorAll("li")
     list = [] 
    
    liEls.forEach((liElement) => {
        list.push({
            name: liElement.innerText,
            checked: liElement.classList.contains("checked"),
        });
    });
   localStorage.setItem("list", JSON.stringify(list));
}



