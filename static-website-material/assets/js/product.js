const btn = document.querySelector("nav .container-lg button");
const nav = document.querySelector("nav .container-lg .hamburger");


btn.addEventListener("click", () => { 
    nav.classList.toggle("dropdown-nav")
});