const btnShow = document.querySelector(".CreateNewConv");
const answer = document.querySelector(".RectNewConv");
const container = document.querySelector(".container");

btnShow.addEventListener("click", () => {
  console.log('je rentre');
  //crée un nouvel élément div
  var newDiv = document.createElement("div");
  newDiv.classList.add("RectNewConv");
  container.appendChild(newDiv);
});