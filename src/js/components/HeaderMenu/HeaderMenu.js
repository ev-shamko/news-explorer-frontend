import { authButtonInnerMarkup, headerMenuInnerMarkup } from '../../constants/markup-constants';

export default class HeaderMenu {
    constructor(objParams) {
        // объект кнопки авторизации
        this._buttonAuthClass = objParams.buttonAuth;

        // константа разметки внутри кнопки авторизации (строка)
        // <span class="menu__username">Выйти</span><img class="menu__logout-icon" src="<%=require('./images/logout-white.png')%>" alt="Кнопка для выхода из сервиса">
        this._authButtonInnerMarkup = authButtonInnerMarkup;


        // контейнер меню
        this._menuContainer = document.querySelector(objParams.menuContainer);

        // дефолтная разметка меню
        this._headerMenuInnerMarkup = headerMenuInnerMarkup;

        // класс куда вставлять имя пользователя
        this._authButtonNamePlace = objParams.authButtonNamePlace;


        // объект кнопки "сохранённые страницы"
        this._classBtnSavedArticles = objParams.buttonSavedArticles;

        // класс для отображения кнопки
        this._btnVisibilityClass = objParams.btnVisibilityClass;

        this.showButtonSavedArticles = this._showButtonSavedArticles.bind(this);
        this.resetHeaderMenu = this._resetHeaderMenu.bind(this);
        this.putUserNameInAuthBtn = this._putUserNameInAuthBtn.bind(this);
    }

    test() {
        console.log(this._buttonAuth);
        console.log(this._authButtonInnerHtml);
        console.log(this._classBtnSavedArticles);
    }

    // метод, отображающий кнопку сохранённых страниц
    _showButtonSavedArticles() {
        const btnSavedArticles = document.querySelector(this._classBtnSavedArticles);
        btnSavedArticles.classList.remove(this._btnVisibilityClass);
    }

    // метод, скрывающий  кнопку сохранённых страниц (добавляет разметку, затем вставляет имя)
    _hideButtonSavedArticles() {}

    // удаляет, а затем создаёт заново все кнопки в меню в хедере, чтобы убрать с них слушатели событий
    _resetHeaderMenu() {
        this._menuContainer.innerHTML = '';
        this._menuContainer.innerHTML = this._headerMenuInnerMarkup;
    }

    // меняет содержимое кнопки аутентификации после авторизации
    _putUserNameInAuthBtn(userName) {
        const buttonAuth = document.querySelector(this._buttonAuthClass);

        buttonAuth.innerHTML = "";
        buttonAuth.innerHTML = this._authButtonInnerMarkup;

        const placeOfUserName = buttonAuth.querySelector(this._authButtonNamePlace);
        placeOfUserName.textContent = userName;
    }
}

/*
Пример объекта для создания экземпляра класса:
{
    buttonAuth: document.querySelector('.menu__auth-button'),
    authButtonNamePlace: '.menu__username',

    menuContainer: document.querySelector('.header__menu-container'),

    buttonSavedArticles: document.querySelector('.menu__page_saved-art'),
    btnVisibilityClass: ' menu__page_hidden',
}
*/
