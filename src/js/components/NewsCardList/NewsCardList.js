export default class NewsCardList {
    constructor(objParams, funcCreateCard) {
        this._articlesContainer = objParams.articlesContainer;
        //console.log(this._articlesContainer);
        this._buttonShowMore = document.querySelector(`${objParams.buttonShowMoreer}`);
        this._funcCreateCard = funcCreateCard;

        this.showResults = this._showResults.bind(this);
    }

    // принимает объект ответа от NewsAPI
    _showResults(obj) {
        /*
        if (obj.status !== 'ok') {
            return console.log('Принят объект со статусом не ок. Хотя вообще-то он даже прийти в эту функцию не должен был');
        }

        if (obj.totalResults === 0) {
            return console.log('Найдено ноль статей. Необходимо отобразить блок с сообщением об отсутствии результатов');
        }
*/
        console.log(`Найдёно ${obj.totalResults} статей`);

        // сохраняем эти две штуки в отдельные переменные, т.к. в forEach this указывает на document
        const articlesContainer = document.querySelector(`${this._articlesContainer}`);
        const funcCreateCard = this._funcCreateCard;

        // удаляет карточки из предыдущей поисковой выдачи
        articlesContainer.innerHTML = '';

        console.log(`Начинаем добавление карточек после очистки предыдущих результатов`);

        // берём массив со статьями и добавляем разметку каждой статьи в блок поисковой выдачи
        obj.articles.forEach(function (article) {
            articlesContainer.appendChild(funcCreateCard(article));
        });

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
