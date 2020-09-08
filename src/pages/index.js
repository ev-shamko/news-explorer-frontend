import "../css/style.css";
import MainApi from "../js/api/MainApi";
import FormRegistration from "../js/components/FormRegistration/FormRegistration";
import FormLogin from "../js/components/FormLogin/FormLogin";
import Popup from "../js/components/Popup/Popup";

/* На случай если буду класть токен в localstorage */
//const getAuthState = () => localStorage.getItem('token');
//const getAuthState = () => localStorage.getItem('token') && validator.isJWT(localStorage.getItem('token'));
//console.log(getAuthState());

const mainApi = new MainApi({
    baseUrl: 'https://api.news-collection.space',
});

mainApi.test(); // сигнализирует о том, что класс успешнос оздан

const popupRegistration = new Popup({
    popupBlock: '.popup__registration',
    classToOpen: 'popup_is-opened',
    anotherAuthPopup: '.popup__login',
    messagePopup: '.popup__message',
});

popupRegistration.test();

const popupLogin = new Popup({
    popupBlock: '.popup__login',
    classToOpen: 'popup_is-opened',
    anotherAuthPopup: '.popup__registration',
    messagePopup: '.popup__message',
});

const popupMessage = new Popup({
    popupBlock: '.popup__message',
    classToOpen: 'popup_is-opened',
    anotherAuthPopup: '.popup__login',
    messagePopup: false,
});


const formRegistration = new FormRegistration(
    {
        formName: document.forms.registration,
        inputsClass: '.form__input',
        //submitButtonClass: '.form__button',
    },
    mainApi.signup,
    popupRegistration.openMessagePopup
);

const formLogin = new FormLogin(
    {
        formName: document.forms.login,
        inputsClass: '.form__input',
        //submitButtonClass: '.form__button',
    },
    mainApi.signin,
);

const menuOpenButton = document.querySelector('.header__menu-button');
const menuInHeader = document.querySelector(".header__menu-container");
const buttonCloseForm = document.querySelector(".popup__close");
const popupBlock = document.querySelector(".popup__login");
const buttonAuth = document.querySelector(".menu__auth-button");

function manageMenuVisibility() {
    menuInHeader.classList.toggle('header__menu-container_displayed');
    menuOpenButton.classList.toggle('header__menu-button_cross-white');
}

function closeForm() {
    popupBlock.classList.remove('popup_is-opened');
}

menuOpenButton.addEventListener('click', manageMenuVisibility);
buttonCloseForm.addEventListener('click', closeForm);
buttonAuth.addEventListener('click', () => {
    popupLogin.openPopup();

    // временный фикс бага с расползающейся вёрсткой из-за мобильного меню. Меню нужно переделать
    if (menuInHeader.classList.contains('header__menu-container_displayed')) {
        manageMenuVisibility();
    }
});
