

  const taskContainer = document.querySelector(".taskRow");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");
  const dropdown = document.querySelector(".dropdown");
  const searchButton = document.querySelector(".fa-search");
  const logoutButton = document.querySelector(".logoutbutton");

  const formSearch = document.querySelector(".search");
  const deleteButton = document.querySelector(".delete");
  const taskRows = document.querySelectorAll(".taskListed");
  const checkBoxes = document.querySelectorAll(".checkbox");
  // const editButton = document.querySelector("");

 // const listId = document.querySelector()
  window.addEventListener("DOMContentLoaded", async () => {

    const numberOfTasks = () => {
      const tasks = document.querySelectorAll(".taskListed")
      const div = document.getElementById("task-number")
      const li = document.createElement('li');
      li.innerHTML = "Tasks"
      div.innerHTML =  tasks.length;
      div.appendChild(li)
  }

    const completedTasks = async () => {
      const res = await fetch()
    }

    // anonymous function
    (function() {
      numberOfTasks();
      completedTasks();
    }());


    addTask.addEventListener("click", async (event)=>{
    // console.log("hi")
    event.preventDefault();
    const formData = new FormData(form);
    const value = formData.get("task");
    const listId = formData.get("listId");

    const res = await fetch('/app/tasks', {
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({ task: value, listId: listId })
    });
    const { newTask } = await res.json();
    try {
      let singleTask = document.createElement('td');
      let check = document.createElement('td');
      let row = document.createElement('tr');
      singleTask.innerHTML = newTask.name;
      singleTask.setAttribute("class", "taskListed");
      check.innerHTML= `<input class="checkbox" type="checkbox">`
      // singleTask.innerHTML = `<input class="checkbox" type="checkbox">${newTask.name} `;
      taskContainer.appendChild(row);
      row.appendChild(check);
      row.appendChild(singleTask);
    } catch (e) {
      console.log(e)
    }

    numberOfTasks();

  });

  // completed functionality
  const completedButton = document.querySelector(".completed");
  completedButton.addEventListener("click", (e => {
    e.preventDefault();
    const taskItems = document.querySelectorAll(".taskRows")
    const array = new Array()

    taskItems.forEach(taskInfo => {
      console.log(taskInfo.childNodes)
      const { 0: checkBox, 1: text, 2: value } = taskInfo.childNodes;
      const { 0: isChecked } = checkBox.childNodes;
      const stringNumber = (value.firstChild.defaultValue)
      const id = parseInt(stringNumber, 10)
      
      if (isChecked.checked) {
        const task = text.innerHTML
        array.push({ task, id });
    }

    });

    if (!array.length) return;
   
   
      const res = fetch("tasks", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ array })
    }).catch(e => console.error(e))

  }))

  // delete functionality
  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    let allTasks = [];
    let selectedTasks = [];

    taskRows.forEach(taskSelected => {
      allTasks.push(taskSelected.innerHTML);
    })

    // console.log(taskRows)

    checkBoxes.forEach( (checkbox, i) => {
      if (checkbox.checked) {
        selectedTasks.push(allTasks[i]);
        taskRows[i].style.display = "none";
        checkBoxes[i].style.display = "none";

      }
    })
    

    // const res = await fetch('tasks', {
    //   method:"DELETE",
    //   headers:{"Content-Type": "application/json"},
    //   body: JSON.stringify({ selectedItems: selectedTasks })
    // });
  })

 

    searchButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const formData = new FormData(formSearch);

      const searchValue = formData.get("searchValue");
      console.log(searchValue)
      const res = await fetch("/app/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchTerm: searchValue }),
      });

      const { allTasks } = await res.json();
     
      const tbody = document.querySelector('.taskRow');
      tbody.innerHTML = "";

      if (allTasks.length) {
        allTasks.forEach(task => {
          const tr = document.createElement('tr');
          const tdCheck = document.createElement('td');
          const tdTask = document.createElement('td');
          const emptyTd = document.createElement('td');
          tdTask.setAttribute("class", "taskListed");
          tdCheck.innerHTML = `<input class="checkbox" type="checkbox">`;
          tdTask.innerHTML = task.name
          tbody.appendChild(tr);
          tr.appendChild(tdCheck);
          tr.appendChild(tdTask);
          tr.appendChild(emptyTd);
        })

      } else {
        const tr = document.createElement('tr');
        const tdCheck = document.createElement('td');
        const tdTask = document.createElement('td');
        const emptyTd = document.createElement('td');
        tdTask.setAttribute("class", "searchError")
        tdTask.innerText = "NO MATCHES FOUND!"
        tbody.appendChild(tr);
        tr.appendChild(tdCheck)
        tr.appendChild(tdTask)
        tr.appendChild(emptyTd)
      }

      numberOfTasks();
    })


    logoutButton.addEventListener("click", async (event) => {
      await fetch('/users/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    })

});
