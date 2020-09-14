import "../../css/articles.css";

import MainApi from "../../js/api/MainApi";
import HeaderMenu from "../../js/components/HeaderMenu/HeaderMenu";
import Summary from "../../js/components/Summary/Summary";

import NewsCard from "../../js/components/NewsCard/NewsCard";
import NewsCardList from "../../js/components/NewsCardList/NewsCardList";

const headerMenu = new HeaderMenu({
    buttonAuth: '.menu__auth-button',
    authButtonNamePlace: '.menu__username',
    menuContainer: '.header__menu-container',
    buttonSavedArticles: '.menu__page_saved-art',
    btnVisibilityClass: 'menu__page_hidden',
});

const summary = new Summary({
    userNameClass: '.summary__username',
    numOfArticles: '.summary__amount',
    keywordsParagraphClass: '.summary__all-keywords',
});

const mainApi = new MainApi({
    baseUrl: 'https://api.news-collection.space',
    funcAfterRegShowMessage: false,
    funcCloseLoginPopup: false,
    funcShowButtonSavedArticles: false,
    funcResetHeaderMenu: headerMenu.resetHeaderMenu,
    funcPutUserNameInAuthBtn: headerMenu.putUserNameInAuthBtn,
    funcSetNumOfSavedArticles: summary.setNumOfSavedArticles,
    funcSetInfoAboutKeywords: summary.setInfoAboutKeywords,
});


/* При загрузке страницы будет запрашиваться юзеринфо и перерисовываться меню в хэдере */

mainApi.getUserData()
    .then((objUserData) => {
        if (objUserData.name) {  // если в объекте ответа есть свойство name
            localStorage.setItem('name', objUserData.name);
            headerMenu.putUserNameInAuthBtn(objUserData.name);
            console.log(`Вы авторизованы. Здравствуйте, ${objUserData.name}`);

            /* Фикс! Делаем иконку логаута чёрной (в кнопке авторизации в хедэре). Нужно, потому что при перерисовке кнопки авторизации стандартно подгружается белая иконка */
            document.querySelector('.menu__logout-icon').setAttribute('src', './images/logout-black.png');
        }

        if (objUserData.name === undefined) {
            localStorage.setItem('name', '');
            console.log(`При загрузке страницы не удалось получить данные пользователя от сервера. Возможно, вы не залогинились. Вы будете перенаправлены на главную страницу.`);
            document.location.href = './index.html';
        }
    })
    .catch(err => console.log(err));



/* Пока что открытие/закрытие мобильного меню в хедере реализовано нижеследующим кодом */

const menuOpenButton = document.querySelector('.header__menu-button');
const menuInHeader = document.querySelector(".header__menu-container");

function openMenu() {
    menuInHeader.classList.toggle('header__menu-container_displayed');
    menuInHeader.classList.toggle('header__menu-container_grey-back');
    menuOpenButton.classList.toggle('header__menu-button_cross-black');
}

menuOpenButton.addEventListener('click', openMenu);

const newsCard = new NewsCard({
    funcForFlagButton: mainApi.deleteArticle,
});

const newsCardList = new NewsCardList({
        articlesContainer: '.articles__container',
        resultsContainer: '.articles__content',
        buttonShowMore: undefined,
        preloaderClass: '.circle-preloader',
        zeroResultsClass: undefined,
        cardHiddenClass: undefined,
    },
    newsCard.сreateFoundArticle,
    newsCard.сreateSavedArticle,
);


mainApi.getArticles()
    .then((res) => {
        newsCardList.showSavedArticles(res); // метод добавит на страницу карточки сохранённых статей и вернёт массив этих статей

        summary.setNumOfSavedArticles();
        summary.setUserName();
        summary.setInfoAboutKeywords();

        /*
        const arrOfSavedArticles = newsCardList.showSavedArticles(res);
        const amountOfKeywords = arrOfSavedArticles.length;
        const arrOfKeywords = [];
        arrOfSavedArticles.forEach((cardObj) => {
            arrOfKeywords.push(cardObj.keyword);
        });
        console.log(arrOfKeywords);
        */

    })
    .catch(err => console.log(err));

