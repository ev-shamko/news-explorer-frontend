import "../css/style.css";
import MainApi from "../js/api/MainApi";
import FormRegistration from "../js/components/FormRegistration/FormRegistration";
import FormLogin from "../js/components/FormLogin/FormLogin";
import Popup from "../js/components/Popup/Popup";
import HeaderMenu from "../js/components/HeaderMenu/HeaderMenu";
import NewsCard from "../js/components/NewsCard/NewsCard";
import NewsCardList from "../js/components/NewsCardList/NewsCardList";
import NewsApi from "../js/api/NewsApi";

/* На случай если буду класть токен в localstorage */
//const getAuthState = () => localStorage.getItem('token');
//const getAuthState = () => localStorage.getItem('token') && validator.isJWT(localStorage.getItem('token'));
//console.log(getAuthState());
const newsCard = new NewsCard();

/* //////////////////////////////// ТЕСТИРОВАНИЕ СОЗДАНИЯ РАЗМЕТКИ КАРТОЧКИ

const cardObj = {
    "source": {
        "id": null,
        "name": "CNET"
    },
    "author": "Amanda Kooser",
    "title": "Scientists reveal grim secrets of ancient Egyptian animal mummies - CNET",
    "description": "High-tech imaging let researchers unwrap mummies of a snake, a cat and a bird without disturbing the remains.",
    "url": "https://www.cnet.com/news/scientists-reveal-grim-secrets-of-ancient-egyptian-animal-mummies/",
    "urlToImage": "https://cnet4.cbsistatic.com/img/J0R9PxR7Wdeenp5yuW9QOOJWbX0=/2020/08/19/a9469c49-cadf-4a75-b196-98864dc34354/mummifiedcatjaw.jpg",
    "publishedAt": "2020-08-20T16:49:00Z",
    "content": "Researchers at Swansea University used a 3D scan to capture this view inside an ancient Egyptian mummy of a cobra. \\r\\nSwansea University\\r\\nA snake, a bird and a cat. Researchers at Swansea University i… [+2225 chars]"
};

const catCard = newsCard._сreateFoundArticle(cardObj);

document.querySelector('.articles__container').innerHTML += catCard;

/////////////////////////////////////////////////////////// */

const newsCardList = new NewsCardList({
        articlesContainer: '.articles__container',
        buttonShowMore: '.articles__show-more-button',
    },
    newsCard.сreateFoundArticle,
);

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


///////////////////////////////////////////////////////// Тестирую добавление найденных карточек в блок выдачи карточек

// newsApi.fetchNews('котята'); // должен работать
// newsApi.fetchNews(''); // должен вернуть ошибку, сообщающую о пустом запросе
// newsApi.fetchNews('ормкуджырпкгурпгукщжпржу'); // вернёт объект ответа со статусом ОК и нулём найденный статей


newsApi.fetchNews('cats')
    .then((resObj) => {
        newsCardList.showResults(resObj);
        console.log('Завершил работу newsCardList.showResults() в index.js');
    })
    .then(() => { console.log('что происходит?')} )
    .catch((err) => console.log(err));

console.log(`Следующая команда в index.js`); // эта команда не выполняется
console.log(`GFYB`);

const fff = `fff`;
console.log(fff);

//newsCardList.showResults(newsApi.fetchNews('котята'));

/////////////////////////////////////////////////////////

// headerMenu._resetHeaderMenu(); // работает и сбрасывает слушатель событий с кнопки авторизации
// headerMenu._putUserNameInAuthBtn('Hello World'); // прекрасно работает
