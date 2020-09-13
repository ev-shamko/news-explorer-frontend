// 4697cc8ce0e443c6b5027c6921de9a61 - my api key
// https://nomoreparties.co/news/v2/everything?q=день&apiKey=4697cc8ce0e443c6b5027c6921de9a61

export default class NewsApi {
    constructor() {
        this._baseUrl = 'https://nomoreparties.co/news/v2/';
        this._apiKey = '4697cc8ce0e443c6b5027c6921de9a61';
        this._headers = {
            'Content-Type': 'application/json',
        }

        this.fetchNews = this._fetchNews.bind(this);
    }

    //keyword - строка, минимум 2 символа
    _fetchNews(keyword) {
        return fetch(`${this._baseUrl}everything?q=${keyword}&apiKey=${this._apiKey}`, {
            headers: this._headers,
        })
            .then((res) => res.json())
            .then((objResult) =>{ // этот then потом можно удалить
                console.log(objResult);
                localStorage.setItem('keyword', keyword);
                return objResult;
            })
            .catch(err => console.log(err));
    }
}

/* Пример объекта ответа objResult:

   {
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
