export default class NewsCardList {
    constructor(objParams, funcCreateCard, funcсreateSavedArticle) {
        this._articlesContainerClass = objParams.articlesContainer;
        this._resultsContainerClass = objParams.resultsContainer;
        // this._buttonShowMore = document.querySelector(`${objParams.buttonShowMoreer}`);
        this._preloaderClass = objParams.preloaderClass;
        this._zeroResultsClass = objParams.zeroResultsClass;

        this._funcCreateCard = funcCreateCard;
        this._funcCreateSavedCard = funcсreateSavedArticle;

        this.showResults = this._showResults.bind(this);
        this.showSavedArticles = this._showSavedArticles.bind(this);
    }

    // этот метод скрывает/отображает block (строка: селектор блока с точкой) в зависимости от значения action: ('show', 'hide')
    _toggleVisibility(classOfBlock, action) {
        const block = document.querySelector(`${classOfBlock}`);
        const visibilityClass = (classOfBlock + '_displayed').slice(1); // получаем название класса без точки в начале, например: 'zero-results_displayed'

        if (action === 'show') {
            return block.classList.add(visibilityClass);
        }

        if (action === 'hide') {
            return block.classList.remove(visibilityClass);
        }
    }

    // принимает массив объектов статей от NewsAPI
    _showResults(arrResults) {

        /* Отображаем лоудер */
        this._toggleVisibility('.articles', 'show');
        this._toggleVisibility(this._resultsContainerClass, 'hide');
        this._toggleVisibility(this._zeroResultsClass, 'hide');
        this._toggleVisibility(this._preloaderClass, 'show');


        /* Удаляем предыдущие карточки статей */
        const articlesContainer = document.querySelector(`${this._articlesContainerClass}`);
        articlesContainer.innerHTML = ''; // заодно удаляем слушатели событий с предыдущих краточек

        /* Ловим внезапную ошибку */
        if (arrResults.status !== 'ok') {
            return console.log('Принят объект ответа от NewsAPI со статусом не "ок". Возможно, проблемы с fetch-запросом к NewsAPI. Это могут быть проблемы: с авторизацией, с адресом запроса, с заголовками, либо сломалось что-то другое.');
        }
        /* Если найдено ноль статей */
        if (arrResults.totalResults === 0) {
            /* Отображаем сообщение "Ничего не найдено" */
            this._toggleVisibility(this._preloaderClass, 'hide');
            this._toggleVisibility(this._zeroResultsClass, 'show');
            return console.log('По вашему запросу ничего не найдено. Попробуйте изменить запрос.');
        }

        /* Если найдено >= 1 статьи */

        // сохраняем функцию создания карточки в отдельную переменную, т.к. внутри forEach this указывает на document
        const funcCreateCard = this._funcCreateCard;

        // берём массив со статьями и добавляем разметку каждой статьи в блок поисковой выдачи
        arrResults.articles.forEach(function (article) {
            articlesContainer.appendChild(funcCreateCard(article));
        });

        /* Отображаем найденные статьи */
        this._toggleVisibility(this._preloaderClass, 'hide');
        this._toggleVisibility(this._resultsContainerClass, 'show');
    }

    _showSavedArticles(arrResult) {
        /* Отображаем лоудер */
        this._toggleVisibility(this._resultsContainerClass, 'hide');
        this._toggleVisibility(this._preloaderClass, 'show');


        /* Удаляем предыдущие карточки статей */
        const articlesContainer = document.querySelector(`${this._articlesContainerClass}`);
        articlesContainer.innerHTML = ''; // заодно удаляем слушатели событий с предыдущих краточек

        /* Если найдено >= 1 статьи */

        // сохраняем функцию создания карточки в отдельную переменную, т.к. внутри forEach this указывает на document
        const funcCreateSavedCard = this._funcCreateSavedCard;

        // берём массив со статьями и добавляем разметку каждой статьи в блок поисковой выдачи
        arrResult.forEach(function (article) {
            articlesContainer.appendChild(funcCreateSavedCard(article));
        });

        /* Отображаем найденные статьи */
        this._toggleVisibility(this._preloaderClass, 'hide');
        this._toggleVisibility(this._resultsContainerClass, 'show');
    }
}