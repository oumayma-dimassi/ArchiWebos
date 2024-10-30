let gallery = document.getElementById("gallery");

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
      image.alt = data[i].tile;

      figure.appendChild(image);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    }
    
  });
}

getWorks();


