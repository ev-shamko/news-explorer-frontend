import "../css/style.css";

const menuOpenButton = document.querySelector('.header__menu-button');
const menuInHeader = document.querySelector(".header__menu-container");

function openMenu() {
    menuInHeader.classList.toggle('header__menu-container_displayed');
    menuOpenButton.classList.toggle('header__menu-button_cross-white');
}

menuOpenButton.addEventListener('click', openMenu);
