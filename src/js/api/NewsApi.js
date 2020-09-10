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
        //this.processNewsResponce = this._processNewsResponce.bind(this);
    }

    /* Нинада

    _processNewsResponce(apiResponce) {
        if (apiResponce.ok) {
            apiResponce.json()
                .then((res) => {
                    console.log(res);
                    return res; // вернёт стандартный объект ответа от newsapi.org со статьями
                })
        } else {
            apiResponce.json()
                .then((error) => {
                    console.log(error);
                    throw new Error(error.message);
                })
                .catch((apiResponce) => {
                    console.error('Произошла ошибка при обращении к источнику новостей');
                    return Promise.reject(new Error(apiResponce)); // вот эта строчка выведет в консоль подробное описание ошибки, если в ответ пришёл объект ошибки
                });
        }
    }*/

    //keyword - строка, минимум 2 символа
    _fetchNews(keyword) {
        return fetch(`https://nomoreparties.co/news/v2/everything?q=${keyword}&apiKey=4697cc8ce0e443c6b5027c6921de9a61`, { // `${this._baseUrl}everything?q=${keyword}&apiKey=${this._apiKey}`
            headers: this._headers,
        })
            .then((res) => res.json())
            .then((objResult) =>{
                console.log(objResult)
                return objResult;
            })
            .catch(err => console.log(err));
    }
}
/*
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
