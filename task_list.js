/*
*******************************************
Scott Horsburgh
Task_Manager Application
07/05/2019
*******************************************
*/
"use strict";
var $ = function(id) { return document.getElementById(id); };

var tasks = [];
var sortDirection = "ASC";

//function that checks localStorage if there is a task or empty string
//and displays the task in the textarea as a list
var displayTaskList = function() {
    var list = "";
    var name = sessionStorage.getItem("name") || " ";

    // if there are no tasks in tasks array, check storage
    if (tasks.length === 0) {
        // get tasks from storage or empty string if nothing in storage
        var storage = localStorage.getItem("tasks") || "";
        // if not empty, convert to array and store in global tasks variable
        if (storage.length > 0) { tasks = storage.split("|"); }
    }
    
    // if there are tasks in array, sort and create tasks string
    if (tasks.length > 0) {
        if(sortDirection === "ASC"){ tasks.sort();}
        else{ tasks.reverse();}
        //tasks.sort()
    }
    //displays index number with item of tasks array for easier delete selection
    tasks.forEach(function(item, index){
        //var itemNumber = index;
        list += index + ". " + item + "\n";
    });
    // display tasks string and set focus on task text box
    $("task_list").value = list; 
    $("task").focus();
    $("name").innerHTML = name + " Tasks";
}

//function to check if user input is empty and gives message if it is
//adds user input to task array and local storage then clears task input
var addToTaskList = function(i) {   
    var task = $("task");
        
        //checks if input is empty and if so gives message to user
        if (task.value === "") {
            alert("Please enter a task.");
        }
        else {  
            // add task to array and local storage
            tasks.push(task.value);
            localStorage.tasks = tasks.join("|");
            // clear task text box and re-display tasks
            task.value = "";
            displayTaskList();
        }
}
//function that clears all task from the list created
var clearTaskList = function() {
    tasks.length = 0;
    localStorage.tasks = "";
    displayTaskList();
}
//function that deletes individual task from the list
var deleteTask = function() {
    var index = parseInt(prompt("Enter the index number of the task to delete."));
        if(!isNaN(index)){
            tasks.splice(index, 1);
            localStorage.tasks = tasks.join("|"); 
            displayTaskList();
        }
}
//function to toggle list from ascending order or reversing order of list
var toggleSort = function() {
    sortDirection = (sortDirection === "ASC") ? "DESC" : "ASC";
    displayTaskList();
}
//function to set name of person for task above task list
var setName = function() {
    var getName = prompt("Enter a name for tasks: ");
    sessionStorage.setItem("name", getName);
    displayTaskList();
}
/*
var filterTasks = function(){
}
*/
window.onload = function() {
    $("add_task").onclick = addToTaskList;
    $("clear_tasks").onclick = clearTaskList;   
    $("delete_task").onclick = deleteTask;
    $("toggle_sort").onclick = toggleSort;
    $("set_name").onclick = setName;
    //$("filter_tasks").onclick = filterTasks;
    displayTaskList();
}