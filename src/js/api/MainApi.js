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
        //console.log(`MainApi.signup() is running. UserData:`);
        //console.log(userData);

        return fetch('https://api.news-collection.space/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => {
                if (res.ok) {
                    console.log('registration was successful');
                    // console.log(res.json()); - более-менее вернёт объект ответа
                    // console.log(JSON.stringify(res.body)); // так в консоли отобразится пустой объект

                    /*  Вот так объект нормально соберётся

                  .then(res => res.json())
                  .then((result) => {
                   console.log(result);
                  })

                    */
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`); //  ${res.message} - не получается вытащить
            })
            .catch((err) => {
                console.log(err); // надо подумать, как это лучше обработать
                //console.log(err.json());
            });
    }

    /*
Пример запроса для регистрации
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

// signin
// getUserData
// getArticles
// createArticle
// removeArticle удаляет статью.

    // создание нового пользователя в бд
    _signin(userData) {
        console.log(`Singing in`);
        console.log(userData);

        return fetch('https://api.news-collection.space/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => {
                if (res.ok) {
                    console.log('you are logged in');
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`); //  ${res.message} - не получается вытащить
            })
            .catch((err) => {
                console.log(err); // надо подумать, как это лучше обработать
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

}
