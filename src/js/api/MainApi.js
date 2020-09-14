// этот api взаимодействует с моим сервером

export default class MainApi {
    constructor(objParams) {
        this._baseUrl = objParams.baseUrl; // 'https://api.news-collection.space'
        this._urlSignup = this._baseUrl + '/signup'; // 'https://api.news-collection.space/signup'
        this._urlSignin = this._baseUrl + '/signin'; // 'https://api.news-collection.space/signin'
        this._urlUsersMe = this._baseUrl + '/users/me'; // 'https://api.news-collection.space/users/me'
        this._urlArticles = this._baseUrl + '/articles';// https://api.news-collection.space/articles

        this._funcAfterRegShowMessage = objParams.funcAfterRegShowMessage;
        this._funcCloseLoginPopup = objParams.funcCloseLoginPopup;
        this._funcShowButtonSavedArticles = objParams.funcShowButtonSavedArticles;
        this._funcResetHeaderMenu = objParams.funcResetHeaderMenu;
        this._funcPutUserNameInAuthBtn = objParams.funcPutUserNameInAuthBtn;
        this._funcSetNumOfSavedArticles = objParams.funcSetNumOfSavedArticles;
        this._funcSetInfoAboutKeywords = objParams.funcSetInfoAboutKeywords;

        this.signup = this._signup.bind(this);
        this.signin = this._signin.bind(this);
        this.createArticle = this._createArticle.bind(this);
        this.deleteArticle = this._deleteArticle.bind(this);
        this.getArticles = this._getArticles.bind(this);
    }

    test() {
        console.log(`Класс MainApi успешно создан. Базовая ссылка: ` + this._baseUrl);
        console.log(this._urlSignup);
        console.log(this._urlSignin);
    }

    // создание нового пользователя в бд
    _signup(userData) {
        return fetch(this._urlSignup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
                this._funcAfterRegShowMessage();
            })
            .catch((err) => {
                console.log('При регистрации нового пользователя произошла ошибка');
                console.log(err);
            });
    }

    /*
Пример объекта для создания нового пользователя
{
    "name": "Test User 14",
    "email": "14@yandex.ru",
    "password": "12345678"
}

Пример ответа по результатам успешной регистрации:
{
    "message": "Новый пользователь успешно создан",
    "data": {
        "_id": "5f54b69088235933cf133fb1",
        "email": "15@yandex.ru",
        "name": "Test User 15"
}

 */


    // создание нового пользователя в бд
    _signin(userData) {
        return fetch(this._urlSignin, {
            method: 'POST',
            credentials: 'include', // обязательно! иначе не поставятся куки
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then((result) => {
                this._funcCloseLoginPopup();
            })
            .then(() => {
                this._getUserData()
                    .then((obj) => {
                        //if (obj) {
                        //console.log(`Приводим сайт в залогиненный вид`);
                        //console.log(`obj.name` + obj.name);
                        localStorage.setItem('name', obj.name);
                        this._funcResetHeaderMenu(); // перерисует меню, чтобы убрать слушатель событий с кнопки авторизации (иначе при нажатии на неё вылезет попап для авторизации, а мы уже авторизованы)
                        this._funcShowButtonSavedArticles(); // отобразит кнопку перехода к сохранённым статьям
                        this._funcPutUserNameInAuthBtn(obj.name); // вставит имя пользователя в кнопку авторизации
                        //}
                    })
            })
            .catch((err) => {
                console.log('При авторизации произошла ошибка');
                console.log(err);
            });
    }

    /*
Пример объекта в теле запроса для авторизации
{
    "email": "14@yandex.ru",
    "password": "12345678"
}

Пример всего fetch-запроса:

fetch('https://api.news-collection.space/signin', {
            method: 'POST',
            credentials: 'include', // обязательно! иначе не поставятся куки
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: '01@yandex.ru',
                password: '12345678'
            }),
        })


Пример тела ответа по результатам успешной регистрации:
{
    "message": "Вы успешно залогинились"
}
 */


    // получить данные о пользователе, которому выдан текущий jwt из кукии
    _getUserData() {
        return fetch(this._urlUsersMe, {
            method: 'GET',
            credentials: 'include',
        })
            .then(res => res.json())
            .catch((err) => {
                console.log('Вы попытались получить данные о своём профиле, но произошла ошибка');
                console.log(err);
            });
    }

    _createArticle(obj) {
        fetch(this._urlArticles, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj),
        })
            .then(res => res.json())
            .then((res) => {
                console.log(`Вы сделали запрос на сохранение статьи в базу данных:`);
                console.log(res);
            })
            .catch((err) => {
                console.log('Возникла ошибка при попытке сохранить статью');
                console.log(err);
            });
    }

    _deleteArticle(id, cardElem) {
        fetch(`${this._urlArticles}/${id}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((res) => {
                cardElem.remove();
                console.log(`Вы успешно удалили статью из базы данных и с веб-страницы.`);
                this._funcSetNumOfSavedArticles();
                this._funcSetInfoAboutKeywords();
                return res;
            })
            .catch((err) => {
                console.log('Возникла ошибка при попытке удаления статьи');
                console.log(err);
            });


    }

    /*
    Пример объекта для _createArticle()

{
    "title": "Article title",
    "text": "Content of the article",
    "date": "2020-08-16T03:41:29.071Z",
    "source": "http://www.some.cite",
    "link": "http://www.some.cite/news.jpg",
    "image": "http://www.some.cite/news.jpg",
    "keyword": "keyword"
}
     */

    _getArticles() {
        return fetch(this._urlArticles, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then((result) => {
                console.log(`Вот список всех ваших статей`);
                console.log(result.data); // res.data - в этом свойстве лежит массив объектов статей
                return result.data;
            })
            .catch((err) => {
                console.log('Проблема при попытке получить список сохранённых статей');
                console.log(err);
            });
    }

    //Что ещё нужно написать:
// removeArticle

}
