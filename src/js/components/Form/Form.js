export default class Form {
    constructor(objParams) {
        this._form = objParams.formName; // например document.forms.registration
        this._allInputsList = this._form.querySelectorAll(objParams.inputsClass);
        this._submitButton = this._form.querySelector(objParams.submitButtonClass);
    }

    test() {
        console.log(`Класс Form успешно подключён. Вот его элементы: `);
        console.log(this._form);
        console.log(this._allInputsList);
        console.log(this._submitButton);
    }
}




/*

Пример объекта опций формы:

{
    formName: document.forms.registration
    inputsClass: 'form__input',
    submitButtonClass: 'form__button',
}

*/
