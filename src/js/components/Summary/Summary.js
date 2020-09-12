export default class Summary {
    constructor(objParams) {
        this._userName = document.querySelector(objParams.userNameClass);
        this._numOfArticles = document.querySelector(objParams.numOfArticles);

        this._setUserName();
    }

    _setUserName() {
        if (localStorage.name !== '') { // 'undefined' именно строка
            console.log('Найдено имя пользователя в localStorage');
            this._userName.textContent = localStorage.name;
        }
    }
}
