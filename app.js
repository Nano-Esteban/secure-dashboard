function login(){

const username = document.getElementById("username").value;
const password = document.getElementById("password").value;

if(username === "admin" && password === "admin123"){

alert("Connexion réussie !");
window.location.href = "dashboard.html";

}else{

document.getElementById("error").innerText = "Mauvais identifiants";

}

}
