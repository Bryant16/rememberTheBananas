  const taskContainer = document.querySelector(".tasks");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");
  const dropdown = document.querySelector(".dropdown");
 // const listId = document.querySelector()
  window.addEventListener("DOMContentLoaded", async () => {
    addTask.addEventListener("click", async (event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    const value = formData.get("task")
      const listId = formData.get("listId");
      console.log(listId);
    const res = await fetch('/app/tasks', { method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({ task: value, listId: listId }) });
    const { newTask } = await res.json();
    // console.log(`task ${task.name}`)
    console.log(newTask)

    try {
      // console.log(task)
      let singleTask = document.createElement('li');
      singleTask.innerHTML = `<input type="checkbox">${newTask.name} `;
      taskContainer.appendChild(singleTask);
    } catch (e) {
        console.log(e)
    }
  });

  })
