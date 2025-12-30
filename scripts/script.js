let icon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

icon.onclick = () => {
    icon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}