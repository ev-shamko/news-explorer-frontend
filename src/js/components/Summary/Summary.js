export default class Summary {
    constructor(objParams) {
        this._userName = document.querySelector(objParams.userNameClass);
        this._numOfArticles = document.querySelector(objParams.numOfArticles);

        this._setUserName();
    }

    _setUserName() {
        if (localStorage.name !== '') { // 'undefined' именно строка
            this._userName.textContent = localStorage.name;
        }
    }
}
