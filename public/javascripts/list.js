const listContainer = document.querySelector(".lists");
const addList = document.querySelector(".add");
const form = document.querySelector(".formList");
const modal = document.querySelector("#myModal");
const close = document.querySelector(".close");

addList.addEventListener("click", async (event)=>{
    event.preventDefault();
    modal.style.display = "block";
})

close.addEventListener("click", async (event)=> {
    modal.style.display = "none";
} )

window.addEventListener("click", async (event)=> {
    if(event.target == modal) {
        modal.style.display = "none";
    }
})
