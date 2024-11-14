let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.getElementById("email");
  let password = document.getElementById("password");



  if (email.value == "" || password.value == "") {
    alert("Veuillez saisir votre email et mot de passe")
  } else {
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "accept": "application/json" },
        body: '{ "email": "' + email.value + '","password": "' + password.value + '" }'
    })
    .then(response => response.json())
    .then(data => {
        
        if(data.userId == undefined){

            alert("Email ou Mot de passe sont incorrecte");
            
        }else{

            alert("vous etes connecté")

            // Stockage des informations dans le localStorage
            window.localStorage.setItem("loginToken", data.token);

            window.location = "/";
        }
    } );
  }


  // handle submit
});
