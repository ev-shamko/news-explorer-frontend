// этот api взаимодействует с моим сервером

export default class MainApi {
    constructor(objParams) {
        this.baseUrl = objParams.baseUrl; // 'https://api.news-collection.space'
        this.urlSignup = this.baseUrl + '/signup'; // 'https://api.news-collection.space/signup'
        this.urlSignin = this.baseUrl + '/signin';

        this.signup = this._signup.bind(this);
        this.signin = this._signin.bind(this);
    }

    test() {
        console.log(`Класс MainApi успешно создан. Базовая ссылка: ` + this.baseUrl);
        console.log(this.urlSignup);
        console.log(this.urlSignin);
    }

    // создание нового пользователя в бд
    _signup(userData) {
        return fetch(this.urlSignup, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
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
        return fetch(this.urlSignin, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);
            })
            .catch((err) => {
                console.log('При регистрации нового пользователя произошла ошибка');
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

    //Что ещё нужно написать:

// getUserData
// getArticles
// createArticle
// removeArticle

}
