import "../css/style.css";
import MainApi from "../js/api/MainApi";
import FormRegistration from "../js/components/FormRegistration/FormRegistration";
import FormLogin from "../js/components/FormLogin/FormLogin";
import FormSearch from "../js/components/FormSearch/FormSearch";
import Popup from "../js/components/Popup/Popup";
import HeaderMenu from "../js/components/HeaderMenu/HeaderMenu";
import NewsCard from "../js/components/NewsCard/NewsCard";
import NewsCardList from "../js/components/NewsCardList/NewsCardList";
import NewsApi from "../js/api/NewsApi";

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

const newsApi = new NewsApi();

const newsCard = new NewsCard({
    funcSaveArticle: mainApi.createArticle,
});

const newsCardList = new NewsCardList({
        articlesContainer: '.articles__container',
        resultsContainer: '.articles__content',
        buttonShowMore: '.articles__show-more-button',
        preloaderClass: '.circle-preloader',
        zeroResultsClass: '.zero-results',
    },
    newsCard.сreateFoundArticle,
);

const formRegistration = new FormRegistration(
    {
        formName: document.forms.registration,
        inputsClass: '.form__input',
    },
    mainApi.signup,
    popupRegistration.openMessagePopup
);

const formLogin = new FormLogin(
    {
        formName: document.forms.login,
        inputsClass: '.form__input',
    },
    mainApi.signin,
);

const formSearch = new FormSearch(
    {
        formName: document.forms.search,
        inputsClass: '.search__input',
    },
    newsApi.fetchNews,
    newsCardList.showResults,
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
// mainApi._getUserData();

/* При загрузке index.html отправляется запрос на сервер на users/me - даже если у пользователя нет куки авторизации */

mainApi._getUserData()
    .then((objUserData) => {
       if (objUserData.name) { // если в объекте ответа есть свойство name
            console.log(`objUserData.name:`);
            console.log(objUserData.name);
            console.log(`Приводим сайт в залогиненный вид`);
            localStorage.setItem('name', objUserData.name);
            headerMenu.resetHeaderMenu(); // перерисует меню, чтобы убрать слушатель событий с кнопки авторизации (иначе при нажатии на неё вылезет попап для авторизации, а мы уже авторизованы)
            headerMenu.showButtonSavedArticles(); // отобразит кнопку перехода к сохранённым статьям
            headerMenu.putUserNameInAuthBtn(objUserData.name); // вставит имя пользователя в кнопку авторизации
        }

        if (objUserData.name === undefined) {
            console.log(`При загрузке страницы не удалось получить данные пользователя от сервера. Возможно, вы не залогинились`);
            localStorage.setItem('name', '');
        }
    })
    .catch(err => console.log(err));

