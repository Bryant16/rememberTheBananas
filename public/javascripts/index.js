  const taskContainer = document.querySelector(".tasks");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");
  const dropdown = document.querySelector(".dropdown");

  window.addEventListener("DOMContentLoaded", async () => {
    const formData = new FormData(form);
    const value = formData.get("task")

    const res = await fetch('/app/tasks', { method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({ task: value }) });
    const { task, users } = await res.json();
    // console.log(`task ${task.name}`)

    users.Lists.forEach(list => {
      let option = document.createElement('option');
      option.innerHTML = list.name;
      dropdown.appendChild(option)
      // console.log(list.name)
    });

    addTask.addEventListener("click", async (event)=>{
      event.preventDefault();
      try {
        // console.log(task)
        let singleTask = document.createElement('li');
        singleTask.innerHTML = task.name;
        taskContainer.appendChild(singleTask);
      } catch (e) {
          console.log(e)
      }
    });

  })
