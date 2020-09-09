export default class Popup {
    constructor(objParams) {
        this._popup = document.querySelector(objParams.popupBlock);
        this._buttonClose = this._popup.querySelector('.popup__close');
        this._classToOpen = objParams.classToOpen;
        this._anotherAuthPopup = document.querySelector(objParams.anotherAuthPopup);
        this._messagePopup = document.querySelector(objParams.messagePopup);

        this._buttonChangeAuthPopup = this._popup.querySelector('.popup__go-to-auth');

        this.openPopup = this._openPopup.bind(this); // методы будут передаваться в другие классы, поэтому биндим this
        this.closePopup  = this._closePopup.bind(this);
        this.openMessagePopup = this._openMessagePopup.bind(this);

        this._setEventListeners();
    }

    test() {
        console.log(this._popup);
        console.log(this._buttonClose);
        console.log(this._classToOpen);
        console.log(this._anotherAuthPopup);
        console.log(this._messagePopup);
    }

    _openPopup() {
        this._popup.classList.add(this._classToOpen);
    }

    _closePopup() {
        this._popup.classList.remove(this._classToOpen);
    }

    _changeAuthPopup() {
        this._closePopup();
        this._anotherAuthPopup.classList.add(this._classToOpen);
    }

    // Если экземпляр класса не должен открывать попап с сообщением, то нужно передать false в objParams.messagePopup
    _openMessagePopup() {
        if (this._messagePopup === false) {
            return console.log('You are trying to open Message Popup. But should you?');
        }
        this._closePopup();
        this._messagePopup.classList.add(this._classToOpen);
    }

    _setEventListeners() {
        this._buttonChangeAuthPopup.addEventListener('click', () => {
            this._closePopup();
            this._changeAuthPopup();
        });

        this._buttonClose.addEventListener('click', () => {
            this.closePopup();
        });
    }
}


/* Объект с параметрами для создания класса
    {
        // блок попапа
        popupBlock: '.popup__registration',

        // класс для отображения попапа
        classToOpen: 'popup_is-opened',

        // ссылка на другой попап, который будет нужно открыть
        anotherAuthPopup: '.popup__login',

        // ссылка на попап с месседжем "Вы зарегистрировались, теперь залогиньтесь"
        messagePopup: '.popup__message',
    }
 */
