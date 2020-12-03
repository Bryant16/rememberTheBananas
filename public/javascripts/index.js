  const taskContainer = document.querySelector(".tasks");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");

  addTask.addEventListener("click", async (event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    const value = formData.get("task")

    try {
        const res = await fetch('app/tasks', { method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({ task: value }) });
        const { task } = await res.json();
        const singleTask = document.createElement('li');
        singleTask.innerHTML = task.name;
        taskContainer.appendChild(singleTask);
    } catch (e) {
        console.log(e)
    }
  })
