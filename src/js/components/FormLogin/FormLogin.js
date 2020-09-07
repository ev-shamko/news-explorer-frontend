import Form from "../Form/Form";

export default class FormLogin extends Form {
    constructor(options, apiLogin) {
        super(options);

        console.log(this._form);

        this.loginFunc = apiLogin;
        this._setEventListeners();
    }

    testForm() {
        console.log('creating FormLogin class');
        console.log(this._form);
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault(); // чтобы страница не перезагрузилась

            const objRegInfo = {
                "email": this._form.email.value,
                "password": this._form.password.value,
            };

            this.loginFunc(objRegInfo);
        });
    }
}
