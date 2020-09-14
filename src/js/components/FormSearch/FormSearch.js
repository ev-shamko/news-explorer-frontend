import Form from "../Form/Form";

export default class FormSearch extends Form {
    constructor(options, funcFetchNews, funcRenderResults) {
        super(options);

        this._searchFunc = funcFetchNews;
        this._renderResults = funcRenderResults;
        this._setEventListeners();
    }

    _setEventListeners() {
        this._form.addEventListener('submit', (event) => {
            event.preventDefault(); // чтобы страница не перезагрузилась
            const keyword = this._form.searchinput.value;

            this._searchFunc(keyword) // отправляет запрос на авторизацию на сервер
                .then((resObj) => {
                    this._renderResults(resObj);
                })
                .catch((err) => console.log(err));
        });
    }
}