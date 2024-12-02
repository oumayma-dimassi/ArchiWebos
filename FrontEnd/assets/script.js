let url='http://localhost:5678/api/works'
let ApiWorksResponse = await fetch(url);
let allWorks = await ApiWorksResponse.json();



const gallery = document.getElementById("gallery");
const modal_gallery = document.getElementById("modal_gallery");

// afficher tous les travaux recuperé via le fetch
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
        
        trash.classList.add("fa-trash");
        trash.classList.add("fa");
        trash.id = works[i].id;

        // création d'un addEventListener listner sur le click au icon trash
        // appel de api DELETE http://localhost:5678/api/works/ en mettant l'id de travaux à supprimer
        // l'ajout de token dans le header est obligatoire
        // token est recupéré au moment de login
        trash.addEventListener('click', (event) => {

        fetch(url + event.target.id, {
            method: "DELETE",
            headers: { Authorization: "Bearer " + window.localStorage.getItem("loginToken"), "accept": "*/*" }
        })


        // event.target.id est l'id de travaux, il est stocké au moment de création de l'icon trash dans la ligne 37
        const eventId = event.target.id;

        // au moment de la supprission de travaux, on doit supprimer l'icon trash correspondant à travers .style.display = "none"
        event.target.style.display = "none";
        // on parcours toutes la liste des travaux, et on prends que les travaux restants à travers work.id != eventId
        const filtredWorks = allWorks.filter(work => work.id != eventId);
        allWorks = filtredWorks;
        // aprés avoir filtrer la liste, on devrait afficher la nouvelle liste
        displayWorks(filtredWorks); 
        })


        // le reste de la méthode est l'affichage des travaux , en mettant les titres et l'id et les images
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





// action pour revenir à la 1er page de modal
let retour = document.getElementById("fa-arrow-left");
retour.addEventListener('click', () => {
  let firstModalContent = document.getElementById("firstModalContent");
  let blocImage = document.getElementById("bloc-image");
  firstModalContent.style.display = "block";
  blocImage.style.display = "none";
});



// récupérer la  modal
let modal = document.getElementById("myModal");

// récupérer le bouton qui ouvre la  modal
let openModal = document.getElementById("open");

// récupérer le bouton qui ouvre la  modal
let openModal2 = document.getElementById("open2");


// les deux icons pour ouvrir le modal
openModal.addEventListener('click', () => {
  modal.style.display = "block";
});

openModal2.addEventListener('click', () => {
  modal.style.display = "block";
});




const categories = document.getElementById("categories");
const header = document.getElementById("header");
const logout = document.getElementById("logout");
const login = document.getElementById("login");


// si on a le token , on affiche le bouton logout avec la possibilités d'ajouter des travaux
// si on a pas le token, on affiche le bouton login avec les filtres des recherches
const loginToken = window.localStorage.getItem("loginToken");

if(loginToken == undefined){
  logout.style.display = "none";
  header.style.display = "none";
  openModal.style.display = "none";
  getcategories();
}else{
   login.style.display = "none";
   categories.style.display = "none";
   getcategoriesSelection();
}

logout.addEventListener('click', () => {
  window.localStorage.removeItem("loginToken");
});



// afficher les photos des catégories avec les boutons spécifique
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
       //selectioner le bouton cliquer par l'utilisateur et filtrer les photos 
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



//récupérer les option de catégorie de modal[ajout photo] 
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



// masquer la premiére version de modal et afficher la seconde version  [ajout photo] 
let goSecondModal = document.getElementById("goSecondModal");
goSecondModal.addEventListener('click', () => {
  let firstModalContent = document.getElementById("firstModalContent");
  let blocImage = document.getElementById("bloc-image");
  firstModalContent.style.display = "none";
  blocImage.style.display = "block";
});



// action pour ajouter l'image et l'afficher dans le modal
let imageUpload = document.getElementById("image-upload");
let output = document.getElementById('image-preview');
output.style.display = "none";
window.addEventListener('change', (event) => {
  let reader = new FileReader();
  reader.addEventListener('load', () => {
    output.innerHTML = '<img id="newImage" src="' + reader.result + '" alt="Image preview">';
    output.style.display = "flex";  
    const inpuut = document.getElementById('image-upload-bloc');    
    inpuut.style.display = "none";
  });

  if(event.target.files != undefined){
    reader.readAsDataURL(event.target.files[0]);
  }
});


let formImage = document.getElementById("formImage");
// action api pour ajouter image dans la base de données
formImage.addEventListener('submit', (e) => {

  e.preventDefault();
  let titleToSend = document.getElementById("title").value;
  let categoryToSend = document.getElementById("category").value;
  let imageUpload = document.getElementById("image-upload");

  const formData = new FormData();
  formData.append("title", titleToSend);
  formData.append("category", categoryToSend);
  formData.append("image", imageUpload.files[0]);

  fetch(url, {
    method: 'POST',
    headers: { Authorization: "Bearer " + window.localStorage.getItem("loginToken") },
    body: formData
})
    .then((res) => window.location.reload())
    .catch((err) => console.log("Error occured", err));
  
});



// icon pour fermer le modal, et rendre le 1er page la page principale, comme ça si on affiche le modal, on trouves tous les travaux
const close = document.getElementById("close");
// action pour fermer le modal
close.addEventListener('click', () => {
  modal.style.display = "none";
  let firstModalContent = document.getElementById("firstModalContent");
  let blocImage = document.getElementById("bloc-image");
    firstModalContent.style.display = "block";
    blocImage.style.display = "none";
});


// ajouter un listner pour cacher le modal si on clique ailleurs
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
    let firstModalContent = document.getElementById("firstModalContent");
    let blocImage = document.getElementById("bloc-image");
    firstModalContent.style.display = "block";
    blocImage.style.display = "none";
  }

  const titleToSend = document.getElementById("title").value;
  const categoryToSend = document.getElementById("category").value;
  const imageUpload = document.getElementById("image-upload");

  if(titleToSend  != "" && categoryToSend != 0 && imageUpload.files != undefined && imageUpload.files.length > 0){
    const submit = document.getElementById('submit'); 
    submit.disabled = false;
    submit.classList.remove("disabledSubmit");
  }else{
    submit.disabled = true;
    submit.classList.add("disabledSubmit");
  }

});