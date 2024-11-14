let ApiWorksResponse = await fetch('http://localhost:5678/api/works');
let allWorks = await ApiWorksResponse.json();


const login = document.getElementById("login");
const logout = document.getElementById("logout");
const header = document.getElementById("header");
const categories = document.getElementById("categories");

const gallery = document.getElementById("gallery");
const modal_gallery = document.getElementById("modal_gallery");

displayWorks(allWorks);

function displayWorks(works) {

  gallery.replaceChildren();

  for (let i = 0; i < works.length; i++) {
        const figure = document.createElement("figure");
        const figure2 = document.createElement("figure");

        const image = document.createElement("img");
        const image2 = document.createElement("img");

        const figcaption = document.createElement("figcaption");
  
        figcaption.innerHTML = works[i].title;
        image.src = works[i].imageUrl;
        image.alt = works[i].title;

        image2.src = works[i].imageUrl;
        image2.alt = works[i].title;
  
        figure.appendChild(image);
        figure2.appendChild(image2);

        figure.appendChild(figcaption);

        gallery.appendChild(figure);
        modal_gallery.appendChild(figure2);
    }
}



function getcategories(){
  fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {

      for(let i = 0; i < data.length; i++){
        const button = document.createElement("button");
        button.id = data[i].id;
        button.innerHTML = data[i].name;
        button.className = "category";
        categories.appendChild(button);
      }

       const allCategories = document.querySelectorAll(".category");

       allCategories.forEach(category =>{

        category.addEventListener('click', () => {
        allCategories.forEach(selected => selected.classList.remove("selectedCategory"))
        category.classList.add("selectedCategory");

        const categoryId = category.id;
        if(categoryId === '0'){
          displayWorks(allWorks);
        }else{
          const filtredWorks = allWorks.filter(work => work.categoryId == categoryId);
          displayWorks(filtredWorks);
        }
        })
       });
    });
}

const loginToken = window.localStorage.getItem("loginToken");

logout.addEventListener('click', () => {
  window.localStorage.removeItem("loginToken");
});



// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("open");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 


if(loginToken == undefined){
  logout.style.display = "none";
  header.style.display = "none";
  btn.style.display = "none";
  getcategories();
}else{
   login.style.display = "none";
   categories.style.display = "none";
}

