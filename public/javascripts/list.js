const listContainer = document.querySelector(".lists");
const addList = document.querySelector(".add");
const form = document.querySelector(".formList");
const modal = document.querySelector("#myModal");
const close = document.querySelector(".close");
const confirmAdd = document.querySelector(".confirmAdd");

addList.addEventListener("click", async (event)=>{
    event.preventDefault();
    modal.style.display = "block";
})

close.addEventListener("click", async (event)=> {
    modal.style.display = "none";
} )

confirmAdd.addEventListener("click", async (event)=> {
    // Logic to add li element
    event.preventDefault();
    const form = document.querySelector(".formList");
    const formData = new FormData(form);
    const value = formData.get("list");

    try {
        const res = await fetch('app/tasks', { method:"POST", headers:{"Content-Type": "application/json"}, body: JSON.stringify({ list: value }) });
        const { list } = await res.json();
        const singleTask = document.createElement('li');
        singleTask.innerHTML = list.name;
        taskContainer.appendChild(singleTask);
    } catch (e) {
        console.log(e)
    }
    modal.style.display = "none";
})

window.addEventListener("click", async (event)=> {
    if(event.target == modal) {
        modal.style.display = "none";
    }
})
