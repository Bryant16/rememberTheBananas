

  const taskContainer = document.querySelector(".taskRow");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");
  const dropdown = document.querySelector(".dropdown");
  const searchButton = document.querySelector(".fa-search");
const logoutButton = document.querySelector(".logoutbutton");
const demoUser = document.getElementById("demo_user");
  const dropDown = document.querySelector('.dropdownmenu')
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

    numberOfTasks();


    addTask.addEventListener("click", async (event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    const value = formData.get("task");
      const listId = formData.get("listId");
      const searchValue = formData.get("searchValue")

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

  deleteButton.addEventListener("click", async (event) => {
    event.preventDefault();
    let allTasks = [];
    let selectedTasks = [];

    taskRows.forEach(taskSelected => {
      allTasks.push(taskSelected.innerHTML);
    })

   

    checkBoxes.forEach( (checkbox, i) => {
      if (checkbox.checked) {
        selectedTasks.push(allTasks[i]);
        taskRows[i].style.display = "none";
        checkBoxes[i].style.display = "none";

      }
    })
    

    const res = await fetch('tasks', {
      method:"DELETE",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({ selectedItems: selectedTasks })
    });
    await res.json()
    window.location.reload();
  })

 

    searchButton.addEventListener("click", async (event) => {
      event.preventDefault();
      window.location.reload();
      const formData = new FormData(formSearch);

      const searchValue = formData.get("searchValue");
      
      const res = await fetch("/app/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchTerm: searchValue }),
      });

      const { allTasks } = await res.json();
   
      function removeAllChildNodes(parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
      if (allTasks.length) {
       
        const tbody = document.querySelector('.taskRow');
        
        removeAllChildNodes(tbody)
        
        allTasks.map(task => {
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
          numberOfTasks();
        })

      } else {
        const tbody = document.querySelector('.taskRow');
        removeAllChildNodes(tbody)
        const tr = document.createElement('tr');
        const tdCheck = document.createElement('td');
        const tdTask = document.createElement('td');
        const emptyTd = document.createElement('td');
        //const child = document.createElement("li");
        tdTask.setAttribute("class", "searchError")
        tdTask.innerText = "NO MATCHES FOUND!"
        tbody.appendChild(tr);
        tr.appendChild(tdCheck)
        tr.appendChild(tdTask)
        tr.appendChild(emptyTd)
        numberOfTasks();
      }
    });
    logoutButton.addEventListener("click", async (event) => {
      await fetch('/users/logout', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      window.location.reload();
    })
 

   
})
