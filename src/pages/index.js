import "../css/style.css";
import MainApi from "../js/api/MainApi";
import FormRegistration from "../js/components/FormRegistration/FormRegistration";
import FormLogin from "../js/components/FormLogin/FormLogin";
import Popup from "../js/components/Popup/Popup";
import HeaderMenu from "../js/components/HeaderMenu/HeaderMenu";

/* На случай если буду класть токен в localstorage */
//const getAuthState = () => localStorage.getItem('token');
//const getAuthState = () => localStorage.getItem('token') && validator.isJWT(localStorage.getItem('token'));
//console.log(getAuthState());

const headerMenu = new HeaderMenu({
    buttonAuth: '.menu__auth-button',
    authButtonNamePlace: '.menu__username',
    menuContainer: '.header__menu-container',
    buttonSavedArticles: '.menu__page_saved-art',
    btnVisibilityClass: 'menu__page_hidden',
});

const popupRegistration = new Popup({
    popupBlock: '.popup__registration',
    classToOpen: 'popup_is-opened',
    anotherAuthPopup: '.popup__login',
    messagePopup: '.popup__message',
});

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

const mainApi = new MainApi({
    baseUrl: 'https://api.news-collection.space',
    funcAfterRegShowMessage: popupRegistration.openMessagePopup,
    funcCloseLoginPopup: popupLogin.closePopup,
    funcShowButtonSavedArticles: headerMenu.showButtonSavedArticles,
    funcResetHeaderMenu: headerMenu.resetHeaderMenu,
    funcPutUserNameInAuthBtn: headerMenu.putUserNameInAuthBtn,
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


// headerMenu._resetHeaderMenu(); // работает и сбрасывает слушатель событий с кнопки авторизации
// headerMenu._putUserNameInAuthBtn('Hello World'); // прекрасно работает
