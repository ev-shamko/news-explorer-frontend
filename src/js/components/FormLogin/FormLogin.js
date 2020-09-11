import Form from "../Form/Form";

export default class FormLogin extends Form {
    constructor(options, apiLogin) {
        super(options);

        this.loginFunc = apiLogin;
        this._setEventListeners();
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault(); // чтобы страница не перезагрузилась

            console.log(`Сработал листенер формы авторизации`);

            const objLoginInfo = {
                "email": this._form.email.value,
                "password": this._form.password.value,
            };

            this.loginFunc(objLoginInfo); // отправляет запрос на авторизацию на сервер
        });
    }
}
