

  const taskContainer = document.querySelector(".taskRow");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");
  const dropdown = document.querySelector(".dropdown");
  const searchButton = document.querySelector(".fa-search");
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

      div.innerHTML =  tasks.length
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
    console.log(selectedTasks)

    const res = await fetch('/app/tasks', {
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({ selectedItems: selectedTasks })
    });
  })

  // editButton.addEventListener("click", async (event) => {
  //   event.preventDefault();
  //   let allTasks = [];
  //   let selectedTasks = [];

  //   taskRows.forEach(taskSelected => {
  //     allTasks.push(taskSelected.innerHTML);
  //   })

  //   checkBoxes.forEach( (checkbox, i) => {
  //     if (checkbox.checked) {
  //       selectedTasks.push(allTasks[i]);
  //       taskRows[i].style.display = "none";
  //       checkBoxes[i].style.display = "none";

  //     }
  //   })
  //   console.log(selectedTasks)
  // })

  searchButton.addEventListener("click", async (event)=>{
    event.preventDefault();
    const formData = new FormData(formSearch);

    const searchValue = formData.get("searchValue");

    const res = await fetch("/app/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ searchTerm: searchValue }),
    });

    const { allTasks } = await res.json();
    const parent = document.querySelector(".tasks")

    if(allTasks.length) {
      parent.innerHTML = ""
      allTasks.map(task => {
        const child = document.createElement("li");
        child.setAttribute("class", "taskListed");
        child.innerHTML = task.name;
        parent.appendChild(child);
        numberOfTasks();
      })

    } else {
      parent.innerHTML = "";
      const child = document.createElement("li");
      child.setAttribute("class", "searchError")
      child.innerText = "NO MATCHES FOUND!"
      parent.appendChild(child);
      numberOfTasks();
    }
  })
})
