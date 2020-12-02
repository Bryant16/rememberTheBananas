const listContainer = document.querySelector(".list-container");

window.addEventListener("click", async (event)=>{
    try {
        const res = await fetch('api/task', { });
        const { list } = await res.json();
        const listHtml = list.map(
          ({ name, id }) => `
          <div class="card" id="listt-${id}">
            <div class="card-body">
              <p class="card-text">${name}</p>
              <button id="${id}" class="delete-button btn btn-secondary">
                Delete
              </button>
            </div>
          </div>
        `
        );

        listContainer.innerHTML = listHtml.join("");

    } catch (e) {
        console.log(e)
    }
})
