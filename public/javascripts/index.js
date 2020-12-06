

  const taskContainer = document.querySelector(".tasks");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");
  const dropdown = document.querySelector(".dropdown");
  const searchButton = document.querySelector(".fa-search");
  const formSearch = document.querySelector(".search");


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
      console.log(searchValue);
    const res = await fetch('/app/tasks', { method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({ task: value, listId: listId }) });
    const { newTask } = await res.json();
    // console.log(`task ${task.name}`)
    console.log(newTask)

    try {
      // console.log(task)
      let singleTask = document.createElement('li');
      singleTask.innerHTML = newTask.name;
      singleTask.setAttribute("class", "taskListed");
      taskContainer.appendChild(singleTask);
    } catch (e) {
      console.log(e)
    }
    numberOfTasks();
    
  });

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
