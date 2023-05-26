const clickCard = document.querySelector(".flip-box");

console.log("Hello world");

clickCard.addEventListener("click",()=>{
    const clickedId = clickCard.getAttribute("id");
    alert("ID : "+clickedId);
})