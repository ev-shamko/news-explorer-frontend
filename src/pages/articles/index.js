import "../../css/articles.css";

import MainApi from "../../js/api/MainApi";
import HeaderMenu from "../../js/components/HeaderMenu/HeaderMenu";

const headerMenu = new HeaderMenu({
    buttonAuth: '.menu__auth-button',
    authButtonNamePlace: '.menu__username',
    menuContainer: '.header__menu-container',
    buttonSavedArticles: '.menu__page_saved-art',
    btnVisibilityClass: 'menu__page_hidden',
});

const mainApi = new MainApi({
    baseUrl: 'https://api.news-collection.space',
    funcAfterRegShowMessage: false,
    funcCloseLoginPopup: false,
    funcShowButtonSavedArticles: false,
    funcResetHeaderMenu: headerMenu.resetHeaderMenu,
    funcPutUserNameInAuthBtn: headerMenu.putUserNameInAuthBtn,
});

/* При загрузке страницы будет запрашиваться юзеринфо и перерисовываться меню в хэдере */

mainApi._getUserData()
    .then((objUserData) => {
        console.log(objUserData);
        //headerMenu.putUserNameInAuthBtn(objUserData.name);
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

/* Фикс! Делаем иконку логаута чёрной (в кнопке авторизации в хедэре). Нужно, потому что при перерисовке кнопки авторизации стандартно подгружается белая иконка */
document.querySelector('.menu__logout-icon').setAttribute('src', '../images/logout-black.png');
