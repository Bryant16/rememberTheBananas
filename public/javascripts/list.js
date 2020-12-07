const listContainer = document.querySelector(".lists");
const addList = document.querySelector(".add");
const form = document.querySelector(".formList");
const modal = document.querySelector("#myModal");
const close = document.querySelector(".close");
const confirmAdd = document.querySelector(".confirmAdd");

addList.addEventListener("click", async (event)=>{
    event.preventDefault();
    modal.style.display = "inline-block";
    document.querySelector("#taskfield").style.position = "relative"
    modal.style.position = "absolute"
    document.querySelectorAll("main").style.backgroundColor = "black"
})

close.addEventListener("click", async (event)=> {
    modal.style.display = "none";
} )

window.addEventListener("click", async (event)=> {
    if(event.target == modal) {
        modal.style.display = "none";
    }
})
