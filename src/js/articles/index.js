import "../../css/articles.css";

const menuOpenButton = document.querySelector('.header__menu-button');
const menuInHeader = document.querySelector(".header__menu-container");

function openMenu() {
    menuInHeader.classList.toggle('header__menu-container_displayed');
    menuInHeader.classList.toggle('header__menu-container_grey-back');
    menuOpenButton.classList.toggle('header__menu-button_cross-black');
}

menuOpenButton.addEventListener('click', openMenu);
