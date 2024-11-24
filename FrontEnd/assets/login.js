let loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json", "accept": "application/json" },
      body: '{ "email": "' + email.value + '","password": "' + password.value + '" }'
  })
  .then(response => response.json())
  .then(data => {   
      if(data.userId == undefined){
          document.getElementById("failedLoginMessage").style.display = "block";        
      }else{
          // Stockage des informations dans le localStorage
          window.localStorage.setItem("loginToken", data.token);
          window.location = "/";
      }
  } );


});
