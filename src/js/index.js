import "../css/style.css";

const menuOpenButton = document.querySelector('.header__menu-button');
const menuInHeader = document.querySelector(".header__menu-container");
const buttonCloseForm = document.querySelector(".popup__close");
const popupBlock = document.querySelector(".popup");
const buttonAuth = document.querySelector(".menu__auth-button");

function manageMenuVisibility() {
    menuInHeader.classList.toggle('header__menu-container_displayed');
    menuOpenButton.classList.toggle('header__menu-button_cross-white');
}

function openForm() {
    popupBlock.classList.add('popup_is-opened');
}

function closeForm() {
    popupBlock.classList.remove('popup_is-opened');
}

menuOpenButton.addEventListener('click', manageMenuVisibility);
buttonCloseForm.addEventListener('click', closeForm);
buttonAuth.addEventListener('click', () => { openForm(); manageMenuVisibility(); });
