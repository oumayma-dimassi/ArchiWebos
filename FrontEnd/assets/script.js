let ApiWorksResponse = await fetch('http://localhost:5678/api/works');
let allWorks = await ApiWorksResponse.json();

const gallery = document.getElementById("gallery");
displayWorks(allWorks);

function displayWorks(works) {

  gallery.replaceChildren();

  for (let i = 0; i < works.length; i++) {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        const figcaption = document.createElement("figcaption");
  
        figcaption.innerHTML = works[i].title;
        image.src = works[i].imageUrl;
        image.alt = works[i].title;
  
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }
}

let categories = document.getElementById("categories");

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

getcategories();