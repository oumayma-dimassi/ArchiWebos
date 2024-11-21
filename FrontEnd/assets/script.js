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
  modal_gallery.replaceChildren();

  for (let i = 0; i < works.length; i++) {
        const figure = document.createElement("figure");
        const figure2 = document.createElement("figure");

        const image = document.createElement("img");
        const image2 = document.createElement("img");

        const figcaption = document.createElement("figcaption");
        const trash = document.createElement("i");
        //<i class="fa fa-trash" aria-hidden="true"></i>
        trash.classList.add("fa-trash");
        trash.classList.add("fa");
        trash.id = works[i].id;

        trash.addEventListener('click', (event) => {



          fetch("http://localhost:5678/api/works/" + event.target.id, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + window.localStorage.getItem("loginToken"), "accept": "*/*" }
        })


        const eventId = event.target.id;

        event.target.style.display = "none";
        const filtredWorks = allWorks.filter(work => work.id != eventId);
        displayWorks(filtredWorks);
          
        })


        figcaption.innerHTML = works[i].title;
        image.src = works[i].imageUrl;
        image.alt = works[i].title;

        image2.src = works[i].imageUrl;
        image2.alt = works[i].title;
        image2.id = works[i].id;
  
        figure.appendChild(image);
        
        figure2.appendChild(trash);
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

function getcategoriesSelection(){
  fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {

      const category = document.getElementById("category");
    
      for(let i = 0; i < data.length; i++){
        const optionElement = document.createElement("option");
        optionElement.value = data[i].id;
        optionElement.innerHTML = data[i].name;
        category.appendChild(optionElement);
      }
    });
}



const loginToken = window.localStorage.getItem("loginToken");

logout.addEventListener('click', () => {
  window.localStorage.removeItem("loginToken");
});



// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("open");

// Get the button 2 that opens the modal
var btn2 = document.getElementById("open2");


var upload = document.getElementById("addImage");
upload.onclick = function(event) {
  var one = document.getElementById("onee");
  var blocImage = document.getElementById("bloc-image");
  one.style.display = "none";
  blocImage.style.display = "block";
}


var retour = document.getElementById("fa-arrow-left");
retour.onclick = function(event) {
  var one = document.getElementById("onee");
  var blocImage = document.getElementById("bloc-image");
  one.style.display = "block";
  blocImage.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    var one = document.getElementById("onee");
    var blocImage = document.getElementById("bloc-image");
    one.style.display = "block";
    blocImage.style.display = "none";
  }
}


// Get the <span> element that closes the modal
var close1 = document.getElementsByClassName("close")[0];
var close2 = document.getElementsByClassName("close")[1];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

btn2.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
close1.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks on <span> (x), close the modal
close2.onclick = function() {
  modal.style.display = "none";
  var one = document.getElementById("onee");
    var blocImage = document.getElementById("bloc-image");
    one.style.display = "block";
    blocImage.style.display = "none";
}



if(loginToken == undefined){
  logout.style.display = "none";
  header.style.display = "none";
  btn.style.display = "none";
  getcategories();
}else{
   login.style.display = "none";
   categories.style.display = "none";
   getcategoriesSelection();
}


var imageUpload = document.getElementById("image-upload");

imageUpload.onchange = function(event){
  var reader = new FileReader();
  reader.onload = function() {
      var output = document.getElementById('image-preview');
      console.log(output.innerHTML);
      output.innerHTML = '<img id="newImage" src="' + reader.result + '" alt="Image preview">';
      console.log(output.innerHTML);
      
  }
  reader.readAsDataURL(event.target.files[0]);
}


var addImage2 = document.getElementById("addImage2");

addImage2.onclick = function(event){

  event.preventDefault();


  var imageToSend = document.getElementById("newImage").src;
  var titleToSend = document.getElementById("title").value;
  var categoryToSend = document.getElementById("category").value;


  fetch("http://localhost:5678/api/works/", {
    method: "POST",
    headers: { Authorization: "Bearer " + window.localStorage.getItem("loginToken"), "accept": "*/*", "Content-Type": "multipart/form-data" },
    body: '{ "image": "' + imageToSend + '","title": "' + titleToSend + '","category": "' + categoryToSend + '" }'

})

  
}
