import "../css/style.css";
import MainApi from "../js/api/MainApi";
import FormRegistration from "../js/components/FormRegistration/FormRegistration";
import FormLogin from "../js/components/FormLogin/FormLogin";

const getAuthState = () => localStorage.getItem('token');
//const getAuthState = () => localStorage.getItem('token') && validator.isJWT(localStorage.getItem('token'));
console.log(getAuthState());

const mainApi = new MainApi({
    baseUrl: 'https://api.news-collection.space',
});

mainApi.test(); // сигнализирует о том, что класс успешнос оздан

const formRegistration = new FormRegistration(
    {
        formName: document.forms.registration,
        inputsClass: '.form__input',
        submitButtonClass: '.form__button',
    },
    mainApi.signin,
);

const formLogin = new FormLogin(
    {
        formName: document.forms.login,
        inputsClass: '.form__input',
        submitButtonClass: '.form__button',
    },
    mainApi.signin,
);

formLogin.testForm();

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
buttonAuth.addEventListener('click', () => {
    openForm();

    // временный фикс бага с расползающейся вёрсткой из-за мобильного меню. Меню нужно переделать
    if (menuInHeader.classList.contains('header__menu-container_displayed')) {
        manageMenuVisibility();
    }
});
