const add = document.querySelector("#add");
const input = document.querySelector("#item-input");
const items_container = document.querySelector(".items_container");
const informe = document.querySelector(".informe");

document.addEventListener("DOMContentLoaded",laodPage());
add.addEventListener("click", addItem);
input.onfocus=()=>{
   informe.style.display="none";
}

items_container.addEventListener("click", function (e) {
   if (e.target.tagName == "INPUT") {
       if (e.target.parentElement.classList.contains("checked")) {
           e.target.parentElement.classList.remove("checked");
           e.target.checked=false
           saveData();
       } else {
           e.target.parentElement.classList.add("checked");
           e.target.checked=true;
           saveData();
       }
   } else if (e.target.tagName == "BUTTON") {
       e.target.parentElement.remove();
       saveData();
   } else if (e.target.tagName == "I" ){
    e.target.parentElement.parentElement.remove();
    saveData();
   }
});
function saveData() {
    localStorage.setItem("tasks", items_container.innerHTML);
}
function laodPage(){
   items_container.innerHTML = localStorage.getItem("tasks");
   // Retrieve all checkboxes
   var checkboxes = document.querySelectorAll('.checkbox');
   // Add event listener to each checkbox
   checkboxes.forEach(function (checkbox) {
       // Add event listener for the 'change' event
       checkbox.addEventListener('change', function () {
           // Store the state of the checkbox in localStorage
           localStorage.setItem(checkbox.parentElement.textContent.trim(), checkbox.checked);
       });
       // Retrieve the state from localStorage and set the checkbox accordingly
       var state = localStorage.getItem(checkbox.parentElement.textContent.trim());
       if (state !== null) {
           checkbox.checked = (state === "true"); // Convert string to boolean
       }
   });
}
function addItem() {
   if (input.value) {
       items_container.innerHTML += `<div class="item">
       <input type="checkbox" class="checkbox">
       <h3 class="lora-font">${input.value}</h3>
       <button class="delete"><i class="fa-solid fa-trash"></i></button>
       </div>`;
   } else {
       informe.style.display="block";
      }
   input.value = "";
   saveData();
   laodPage();
}