export default class NewsCardList {
    constructor(objParams, funcCreateCard) {
        this._articlesContainerClass = objParams.articlesContainer;
        // this._buttonShowMore = document.querySelector(`${objParams.buttonShowMoreer}`);
        this._preloaderClass = objParams.preloaderClass;
        this._zeroResultsClass = objParams.zeroResultsClass;

        this._funcCreateCard = funcCreateCard;

        this.showResults = this._showResults.bind(this);
    }

    _resultsContainer(arg) {
        const resultsBlock = document.querySelector(`${this._articlesContainerClass}`);

    }

    // отображает/скрывает блок с прелоудером
    _preloader(arg) {
        const preloader = document.querySelector(`${this._preloaderClass}`);
        const visibilityClass = (this._preloaderClass + '_displayed').slice(1); // получаем название класса без точки в начале: 'circle-preloader_displayed'
        console.log(`preloader visibility class is ${visibilityClass}`);

        if (arg === 'show') {
            preloader.classList.add(visibilityClass);
            return console.log(`now preloader must be visible`);
        }

        if (arg = 'hide') {
            preloader.classList.remove(visibilityClass);
            return console.log(`now preloader must be hidden`);
        }

        return console.log('some error occurred during managing preloader visibility');
    }

    // отображает/скрывает блок с сообщением "Ничего не найдено"
    _zeroResultsBlock(arg) {
        const zeroResultsBlock = document.querySelector(`${this._zeroResultsClass}`);
        const visibilityClass = (this._zeroResultsClass + '_displayed').slice(1); // получаем название класса без точки в начале: 'zero-results_displayed'

        if (arg === 'show') {
            zeroResultsBlock.classList.add(visibilityClass);
            return console.log(`now zeroResultsBlock must be visible`);
        }

        if (arg = 'hide') {
            zeroResultsBlock.classList.remove(visibilityClass);
            return console.log(`now zeroResultsBlock must be hidden`);
        }

        return console.log('some error occurred during managing zeroResultsBlock visibility');
    }

    // принимает объект ответа от NewsAPI
    _showResults(obj) {

        this._preloader('hide');
        this._zeroResultsBlock('hide');
        const articlesContainer = document.querySelector(`${this._articlesContainerClass}`);
        articlesContainer.innerHTML = '';

        this._preloader('show');

        const zeroResultsBlock = document.querySelector(`${this._zeroResultsClass}`);


        if (obj.status !== 'ok') {
            return console.log('Принят объект со статусом не ок. Хотя вообще-то он даже прийти в эту функцию не должен был');
        }

        if (obj.totalResults === 0) {
            this._preloader('hide');
            this._zeroResultsBlock('show');
            return console.log('Найдено ноль статей');
        }

        console.log(`Найдёно ${obj.totalResults} статей`);

        // сохраняем эти две штуки в отдельные переменные, т.к. в forEach this указывает на document

        const funcCreateCard = this._funcCreateCard;

        // удаляет карточки из предыдущей поисковой выдачи


        console.log(`Начинаем добавление карточек после очистки предыдущих результатов`);

        // берём массив со статьями и добавляем разметку каждой статьи в блок поисковой выдачи
        obj.articles.forEach(function (article) {
            articlesContainer.appendChild(funcCreateCard(article));
        });
        this._preloader('hide');

        console.log(`Завершено добавление результатов поиска на страницу`);
    }

    _setEventListeners() {
        // обработчик нажатия на кнопку "больше статей"
    }
}

////////////////////////////////////////////////////////////////////////////////
// принимает массив карточек
// отрисовывает их на странице

/*
const objParams = {
    articlesContainer: '.articles__container',
    buttonShowMore: '.articles__show-more-button',
}

const resObj = {
    "status": "ok",
    "totalResults": 56,
    "articles":
        [
            {
                "source": {
                    "id": null,
                    "name": "Pikabu.ru"
                },
                "author": null,
                "title": "Котята",
                "description": "",
                "url": "https://pikabu.ru/story/kotyata_7648649",
                "urlToImage": null,
                "publishedAt": "2020-08-13T12:07:36Z",
                "content": null
            },
            {
                "source": {
                    "id": null,
                    "name": "Pikabu.ru"
                },
                "author": null,
                "title": "Котята",
                "description": "5 дней назад на помойке были найдены 4 комочка . Весили они от 230 грамм до 400. Отмыты , отвоёваны от блох . Ребята славные , немного побаиваются но активно утром просят кушать и через раз ходят в лоток . Очень нужны для них хозяева ! Долго держать у себя не…",
                "url": "https://pikabu.ru/story/kotyata_7674921",
                "urlToImage": null,
                "publishedAt": "2020-08-26T04:32:20Z",
                "content": null
            },
        ]
}

 */
