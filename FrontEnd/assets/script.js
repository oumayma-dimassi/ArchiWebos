const gallery = document.getElementById("gallery");

function getWorks() {

fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {

    for (let i = 0; i < data.length; i++) {

      const figure = document.createElement("figure");
      const image = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      figcaption.innerHTML = data[i].title;
      image.src = data[i].imageUrl;
      image.alt = data[i].title;

      figure.appendChild(image);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }
    
  });
}

getWorks();


const categories = document.getElementById("categories");
function getcategories(){

  fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(data => {
  for(let i = 0; i < data.length; i++){
    const button = document.createElement("button");
    button.id = data[i].id;
    button.innerHTML = data[i].name;
    button.className = "categorie";
    categories.appendChild(button);
    button.addEventListener('click', getCategoriesByID, false);
   }
 });
}

getcategories();

const categorie = document.getElementsByClassName("categorie");

var getCategoriesByID = function(evt) {

  const myID = evt.currentTarget.id;
  gallery.replaceChildren();


  fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {

    for (let i = 0; i < data.length; i++) {

      if(myID == data[i].categoryId){
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");
  
        figcaption.innerHTML = data[i].title;
        image.src = data[i].imageUrl;
        image.alt = data[i].title;
  
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      }else if(myID == 0) {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");
  
        figcaption.innerHTML = data[i].title;
        image.src = data[i].imageUrl;
        image.alt = data[i].title;
  
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      } 
    }
    
  });

};


categorie[0].addEventListener('click', getCategoriesByID, false);



























//const categories 
//  function getcategories
// fetch categories
// les deux then
//boucle for 
//const button createlement boutton
//class categorie
//id+valeur de LAPI
//name categorie dans LAPI 
