// этот api взаимодействует с моим сервером

export default class MainApi {
    constructor(objParams) {
        this.baseUrl = objParams.baseUrl; // 'https://api.news-collection.space'
        this.urlSignup = this.baseUrl + '/signup'; // 'https://api.news-collection.space/signup'
        this.urlSignin = this.baseUrl + '/signin';

        this.signup = this._signup.bind(this); // метод передаётся в экземпляр класса FormRegistration и там вызывается, поэтому this нужно забиндить
    }

    test() {
        console.log(`Класс MainApi успешно создан. Базовая ссылка: ` + this.baseUrl);
        console.log(this.urlSignup);
        console.log(this.urlSignin);
    }

    // создание нового пользователя в бд
    _signup(userData) {
        const {name, email, password} = userData;
        console.log(`MainApi.signup() is running. UserData:`);
        console.log(userData);

        return fetch('https://api.news-collection.space/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then(res => {
                if (res.ok) {
                    console.log('registration sucsessfull. This is res:');
                    console.log(res.json);
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .catch((err) => {
                console.log(err.message);
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


}
