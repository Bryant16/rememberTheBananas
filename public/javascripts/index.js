  const taskContainer = document.querySelector(".tasks");
  const addTask = document.querySelector(".submit");
  const form = document.querySelector(".form");
  const dropdown = document.querySelector(".dropdown");
const deleteButton = document.querySelector(".delete");
  window.addEventListener("DOMContentLoaded", async () => {
    addTask.addEventListener("click", async (event)=>{
    event.preventDefault();
    const formData = new FormData(form);
    const value = formData.get("task")
      const listId = formData.get("listId");
    const res = await fetch('/app/tasks', { method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({ task: value, listId: listId }) });
    const { newTask } = await res.json();
    try {
      let singleTask = document.createElement('li');
      singleTask.innerHTML = `<input class="checkbox" type="checkbox">${newTask.name} `;
      taskContainer.appendChild(singleTask);
    } catch (e) {
        console.log(e)
    }
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
  })
