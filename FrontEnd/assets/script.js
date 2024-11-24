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
        allWorks = filtredWorks;
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
let btn = document.getElementById("open");

// Get the button 2 that opens the modal
let btn2 = document.getElementById("open2");


let upload = document.getElementById("addImage");
upload.addEventListener('click', () => {
  let firstModalContent = document.getElementById("firstModalContent");
  let blocImage = document.getElementById("bloc-image");
  firstModalContent.style.display = "none";
  blocImage.style.display = "block";
});


upload.addEventListener('click', () => {

});


let retour = document.getElementById("fa-arrow-left");
retour.addEventListener('click', () => {
  let firstModalContent = document.getElementById("firstModalContent");
  let blocImage = document.getElementById("bloc-image");
  firstModalContent.style.display = "block";
  blocImage.style.display = "none";
});


// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', () => {
  if (event.target == modal) {
    modal.style.display = "none";
    let firstModalContent = document.getElementById("firstModalContent");
    let blocImage = document.getElementById("bloc-image");
    firstModalContent.style.display = "block";
    blocImage.style.display = "none";
  }
});

// Get the <span> element that closes the modal
const close = document.getElementById("close");

// When the user clicks on the button, open the modal
window.addEventListener('click', () => {
  modal.style.display = "block";
});

window.addEventListener('click', () => {
  modal.style.display = "block";
});


close.addEventListener('click', () => {
  modal.style.display = "none";
  let firstModalContent = document.getElementById("firstModalContent");
  let blocImage = document.getElementById("bloc-image");
    firstModalContent.style.display = "block";
    blocImage.style.display = "none";
});


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


let imageUpload = document.getElementById("image-upload");

window.addEventListener('change', () => {

  let reader = new FileReader();
  reader.onload = function() {
      let output = document.getElementById('image-preview');
      output.innerHTML = '<img id="newImage" src="' + reader.result + '" alt="Image preview">';
      output.style.display = "block";  
      const inpuut = document.getElementById('image-upload-bloc');    
      inpuut.style.display = "none";
      
  }
  reader.readAsDataURL(event.target.files[0]);

});

 //remplacer les var par let
 let submit = document.getElementById("formImage");

submit.addEventListener('submit', (e) => {

  e.preventDefault();
  let titleToSend = document.getElementById("title").value;
  let categoryToSend = document.getElementById("category").value;
  let imageUpload = document.getElementById("image-upload");


  const files = document.getElementById("files");
  const formData = new FormData();
  formData.append("title", titleToSend);
  formData.append("category", categoryToSend);
  formData.append("image", imageUpload.files[0]);


  fetch("http://localhost:5678/api/works", {
    method: 'POST',
    headers: { Authorization: "Bearer " + window.localStorage.getItem("loginToken") },
    body: formData
})
    .then((res) => window.location.reload())
    .catch((err) => console.log("Error occured", err));
  
})
