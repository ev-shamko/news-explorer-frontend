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
            console.log(`formSearch is sending keyword "${keyword}" to nesApi.fetchNews()`);

            this._searchFunc(keyword) // отправляет запрос на авторизацию на сервер
                .then((resObj) => {
                    this._renderResults(resObj);
                    console.log('Завершил работу newsCardList.showResults() в листенере formSearch');
                })
                .catch((err) => console.log(err));
        });
    }
}
