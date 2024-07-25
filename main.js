let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasks_Div = document.querySelector(".tasks");

// empty array to store tasks
let arrayOfTasks = [];

//check if there is tasks in local storage save it
if (localStorage.getItem("tasks")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));  
}  

// call function get local storage 
getDatafromLocalStorage();
//! get item local storage after reload and appens it to html
function getDatafromLocalStorage() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        let tasks = JSON.parse(data);  
        // call function to save data in html
        addElementsToPageFrom(tasks);
    }  
}

// enter key or click submit  
submit.addEventListener("click", () => {
  var text_to_add = input.value;  
  if (text_to_add !== "") {
    input.value = "";  
    addTaskToArray(text_to_add);
  }  
});  

input.addEventListener("keydown", (event) => {
  var text_to_add = input.value;  
  if (event.key == "Enter" && text_to_add !== "") {
    input.value = "";  
    addTaskToArray(text_to_add);
  }  
});
  
//  function local storage append
function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

  

// del fun
function deleted_fun(deleted){
    deleted.addEventListener("click",()=>{
        // remove from local storage by delete but
        let id_of_item_to_delete=deleted.parentElement.parentElement.getAttribute("data-id");
        arrayOfTasks = arrayOfTasks.filter((task) => task.id != id_of_item_to_delete);
        // update local storage after filter
        addDataToLocalStorageFrom(arrayOfTasks);
        // remove from page
        deleted.parentElement.parentElement.remove();
    })    
}    

// edit fun
function edit_fun(edit, arrayOfTasks) {
  edit.addEventListener("click", (e) => {
    var inp_txt = edit.parentElement.previousElementSibling;  
    if (edit.innerText.toLowerCase() === "edit") {
      edit.innerText = "save";  
      inp_txt.removeAttribute("readonly");
      inp_txt.focus();
    } else if (edit.innerText.toLowerCase() === "save") {
      edit.innerText = "Edit";  
      inp_txt.setAttribute("readonly", "true");
      var edited_txt = inp_txt.value;
      var id_current_edit = inp_txt.parentElement.getAttribute("data-id");

      arrayOfTasks.forEach((task) => {
        if (task.id == id_current_edit) {
          task.title = edited_txt;  
          addDataToLocalStorageFrom(arrayOfTasks);
        }  
      });  
    }  
  });  
}  


function addTaskToArray(text_to_add) {
  const task = {
    id: Date.now(),  
    title: text_to_add,
  };  
  //push text to the array
  arrayOfTasks.push(task);

  //call function add element in html
  addElementsToPageFrom(arrayOfTasks);
  // Add Tasks To local storage
  addDataToLocalStorageFrom(arrayOfTasks);
}  
//call function add element in html
function addElementsToPageFrom(arrayOfTasks) {
  tasks_Div.innerHTML = "";  
  arrayOfTasks.forEach((task) => {
    // create main div  
    let newDiv = document.createElement("div");
    newDiv.className = "task";
    newDiv.setAttribute("data-id", task.id);

    // create delete but edit but
    let edit_delete = document.createElement("div");
    edit_delete.className = "edit_delete";
    // delete
    let deleted = document.createElement("span");
    deleted.className = "delete";
    deleted.appendChild(document.createTextNode("Delete"));
    edit_delete.appendChild(deleted);
    // fun delete
    deleted_fun(deleted);

    // edit
    var edit = document.createElement("span");
    edit.className = "edit";
    edit.appendChild(document.createTextNode("Edit"));
    edit_delete.appendChild(edit);
    // fun edit
    edit_fun(edit,arrayOfTasks);

    //    add task to html
    var newTask = document.createElement("input");
    newTask.className = "task_input";
    newTask.setAttribute("readonly", "true");

    newTask.value = `${task.title}`;
    newDiv.appendChild(newTask);
    newDiv.appendChild(edit_delete);
    tasks_Div.appendChild(newDiv);

  });  
}  
