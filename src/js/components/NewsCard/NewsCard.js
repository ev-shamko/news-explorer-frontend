export default class NewsCard {
    constructor(objParams) {
        this._funcActivateFlagButton = objParams.funcForFlagButton; // для index.html сохраняем карточку в бд, для arcticles.html удаляем карточку из бд

        this.сreateFoundArticle = this._сreateFoundArticle.bind(this);
        this.сreateSavedArticle = this._сreateSavedArticle.bind(this);
        this.saveArticle = this._saveArticle.bind(this);
        this.deleteArticle = this._deleteArticle.bind(this);
    }

    /* принимает объект карточки от NewsAPI
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
    }, */

    _getArticleData(rawArticle) {
        const articleInfo = {};

        articleInfo.imgUrl = rawArticle.urlToImage; // добавить проверку на null
        // article.date = '' magic
        articleInfo.title = rawArticle.title;
        articleInfo.description = rawArticle.description;
        articleInfo.source = rawArticle.source.name;
        articleInfo.sourceLink = rawArticle.url;

        return articleInfo;
    }

    _сreateFoundArticle(rawArticle) {
        const articleInfo = {};

        articleInfo.imgUrl = rawArticle.urlToImage;
        // articleInfo.date = '' magic
        articleInfo.title = rawArticle.title;
        articleInfo.description = rawArticle.description;
        articleInfo.source = rawArticle.source.name;
        articleInfo.sourceLink = rawArticle.url;
        articleInfo.publishedAt = rawArticle.publishedAt;

        // необходимо добавить проверку на залогиненность. Если пользователь авторизован, сообщение "Войдите, чтобы сохранять статьи" меняется

        const cardElem = document.createElement('div');
        cardElem.classList.add('card');

        const foundCardInnerMarkup = `
              <div class="card__illustration"
                   style="">
                <div class="card__button-container">
                  <button class="card__button">
                    <img class="card__button-icon" src="./images/save-flag.svg" rawlink=""
                         alt="Кнопка для добавления статьи в избранное">
                  </button>
                  <div class="card__message-container">
                    <span class="card__message">Войдите, чтобы сохранять статьи</span>
                  </div>
                </div>
              </div>
              <div class="card__content">
                <div class="card__article">
                  <p class="card__date" publishedat="">2 августа, 2019</p>
                  <h2 class="card__header"></h2>
                  <p class="card__text"></p>                  
                  <p class="card__source"><a class="card__source-link" href=""></a></p>                  
                </div>
              </div>`;

        cardElem.innerHTML = foundCardInnerMarkup;

        // это лучше в отдельный метод
        cardElem.querySelector('.card__illustration').setAttribute('style', `background-image: url('${articleInfo.imgUrl}')`);
        cardElem.querySelector('.card__illustration').setAttribute('rawlink', articleInfo.imgUrl);
        cardElem.querySelector('.card__header').textContent = articleInfo.title;
        cardElem.querySelector('.card__text').textContent = articleInfo.description;
        cardElem.querySelector('.card__source-link').setAttribute('href', articleInfo.sourceLink);
        cardElem.querySelector('.card__source-link').textContent = articleInfo.source;
        cardElem.querySelector('.card__date').setAttribute('publishedAt', articleInfo.publishedAt); //${conversionDate(date, MONTHS).textDate}
        cardElem.querySelector('.card__date').textContent = articleInfo.publishedAt.slice(0,10);

        // seteventlisteners

        const sendArticleDataToServer = this.saveArticle; // иначе в addEventListener this будет теряться
        cardElem.querySelector('.card__button').addEventListener('click', sendArticleDataToServer);

        return cardElem;
    }

    _сreateSavedArticle(rawArticle) {
        const articleInfo = {};

        articleInfo.imgUrl = rawArticle.image;
        articleInfo.date = rawArticle.date;
        articleInfo.title = rawArticle.title;
        articleInfo.description = rawArticle.text;
        articleInfo.source = rawArticle.source;
        articleInfo.sourceLink = rawArticle.link;
        articleInfo.publishedAt = rawArticle.date;
        articleInfo.id = rawArticle._id;
        articleInfo.keyword = rawArticle.keyword;

        // необходимо добавить проверку на залогиненность. Если пользователь авторизован, сообщение "Войдите, чтобы сохранять статьи" меняется

        const cardElem = document.createElement('div');
        cardElem.classList.add('card');

        const savedCardInnerMarkup = `
              <div class="card__illustration"
                   style="">
                <div class="card__button-container">
                  <button class="card__button">
                    <img class="card__button-icon" src="./images/delete-button.svg" alt="Кнопка для удаления статьи">
                  </button>
                  <div class="card__message-container card__message-container_message">
                    <span class="card__message">Убрать из сохранённых</span>
                  </div>
                  <div class="card__message-container card__message-container_keyword">
                    <span class="card__keyword"></span>
                  </div>
                </div>
              </div>
              <div class="card__content">
                <div class="card__article">
                  <p class="card__date" publishedat="">2 августа, 2019</p>
                  <h2 class="card__header"></h2>
                  <p class="card__text"></p>                  
                  <p class="card__source"><a class="card__source-link" href=""></a></p>                  
                </div>
              </div>`;

        cardElem.innerHTML = savedCardInnerMarkup;


        // это лучше в отдельный метод
        cardElem.querySelector('.card__header').textContent = articleInfo.title;
        cardElem.querySelector('.card__text').textContent = articleInfo.description;
        cardElem.querySelector('.card__illustration').setAttribute('style', `background-image: url('${articleInfo.imgUrl}')`);
        cardElem.querySelector('.card__keyword').textContent = articleInfo.keyword;

        cardElem.querySelector('.card__source-link').setAttribute('href', articleInfo.sourceLink);
        cardElem.querySelector('.card__source-link').textContent = articleInfo.source;

        cardElem.querySelector('.card__date').setAttribute('publishedAt', articleInfo.date); //${conversionDate(date, MONTHS).textDate}
        cardElem.querySelector('.card__date').textContent = articleInfo.date.slice(0,10);

        // добавить id
        cardElem.setAttribute('id', articleInfo.id);

        // seteventlisteners

        const deleteArticle = this.deleteArticle; // иначе в addEventListener this будет теряться
        cardElem.querySelector('.card__button').addEventListener('click', deleteArticle);

        return cardElem;
    }

    // принимает в качестве аргумента event.target от this._saveArticle (т.е. кнопку сохранения статьи)
    // возвращает объект с данными для mongoDB, его сразу можно поместить в тело fetch-запроса
    _gatherCardData(eventTarget) {
        const card = eventTarget.closest('.card');

        const cardData = {
            title: card.querySelector('.card__header').textContent,
            text: card.querySelector('.card__text').textContent,
            date: card.querySelector('.card__date').getAttribute('publishedat'),
            source: card.querySelector('.card__source').textContent,
            link: card.querySelector('.card__source-link').getAttribute('href'),
            image: card.querySelector('.card__illustration').getAttribute('rawlink'),
            keyword: localStorage.getItem('keyword'),
        };

        return cardData;
    }

    _saveArticle(event) {
        const cardDataObj = this._gatherCardData(event.target);

        // отправляет на мой сервер объект с данными карточки
        this._funcActivateFlagButton(cardDataObj);

        // если сохранилось успешно, то нужно пересоздать кнопку сохранения
        // и изменить надпись кнопки
    }

    _deleteArticle(event) {
        const cardElem = event.target.closest('.card');
        const cardId = cardElem.getAttribute('id');

        console.log(`Вы пытаетесь удалить карточку со следующим _id:`);
        console.log(cardId);

        // при создании класса на articles.html в метод _funcActivateFlagButton передаётся запрос на удаление статьи по id из mainApi
        // предполагается, что на articles.html нам нужна только эта функция
        this._funcActivateFlagButton(cardId, cardElem);

        // затем нужно удалить элемент карточки
    }
}
