  const taskContainer = document.querySelector(".tasks");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");

  addTask.addEventListener("click", async (event)=>{
    event.preventDefault();
    //console.log(event.target)
    const formData = new FormData(form);
    const value = formData.get("task")
    //const id = formData.get("listId")
    //const id = formData.getAll()
    //console.log(id)
    //console.log(formData)

    try {
        const res = await fetch('/app/tasks', { method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({ task: value, listId: 1 }) });
        const { task } = await res.json();
        const singleTask = document.createElement('li');
        singleTask.innerHTML = task.name;
        taskContainer.appendChild(singleTask);
    } catch (e) {
        console.log(e)
    }
  })
