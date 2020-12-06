

  const taskContainer = document.querySelector(".tasks");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");
  const dropdown = document.querySelector(".dropdown");
  const searchButton = document.querySelector(".fa-search");
  const formSearch = document.querySelector(".search");


 // const listId = document.querySelector()
const deleteButton = document.querySelector(".delete");
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
    try {
      let singleTask = document.createElement('tr');
      singleTask.innerHTML = newTask.name;
      singleTask.setAttribute("class", "taskListed");
      singleTask.innerHTML = `<input class="checkbox" type="checkbox">${newTask.name} `;
      taskContainer.appendChild(singleTask);
    } catch (e) {
      console.log(e)
    }
    numberOfTasks();

  });
    deleteButton.addEventListener("click", async (event) => {
      event.preventDefault();
      const checkboxes = document.querySelectorAll(".checkbox");
      const list = document.querySelectorAll(".taskLi");
      // console.log(list[3]);
      // console.log(list[4])
      // checkboxes.forEach(checkbox => {
      //   if (checkbox.checked) {
      //     console.log(checkbox);
      //   }
      // });
      const res = await fetch(`/app/tasks`, {
        method: "DELETE", headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify({ items: [9, 10] })
      });
      const { message } = await res.json();
      try {

      } catch (e) {

      }
    })

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
