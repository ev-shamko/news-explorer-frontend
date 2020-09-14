export default class Summary {
    constructor(objParams) {
        this._userName = document.querySelector(objParams.userNameClass);
        this._numOfArticles = document.querySelector(objParams.numOfArticles);
        this._keywordsParagraphClass = objParams.keywordsParagraphClass;

        this.setNumOfSavedArticles = this._setNumOfSavedArticles.bind(this);
        this.setInfoAboutKeywords = this._setInfoAboutKeywords.bind(this);

        this.setUserName = this._setUserName.bind(this);

    }

    _setUserName() {
        if (localStorage.name !== '') { // 'undefined' именно строка
            this._userName.textContent = localStorage.name;
        }
    }

    /* Отображаем количество сохранённых статей */
    _setNumOfSavedArticles() {
        const allArticlesNodeList = document.querySelectorAll('.card');
        const amountOfCards = allArticlesNodeList.length;
        this._numOfArticles.textContent = amountOfCards;
    }

    /* Отображаем информацию о ключевых словах сохранённых статей */
    _setInfoAboutKeywords() {
        const keywordsParagraph = document.querySelector(this._keywordsParagraphClass);
        const visibilityClass = (this._keywordsParagraphClass + '_displayed').slice(1); // этот класс делает параграфу opacity: 1
        const allKeywords = document.querySelectorAll('.card__keyword');
        const arrAllKeywords = [];


        allKeywords.forEach((element) => {
            arrAllKeywords.push(element.innerText);
        });

        // собираем массив уникальных ключевых слов (т.к. в arrAllKeywords могут встречаться повторения)
        const uniqKeywords = Array.from(new Set(arrAllKeywords));

        console.log(`uniqKeywords`);
        console.log(uniqKeywords);


        if (uniqKeywords.length === 0) {
            keywordsParagraph.innerHTML =
                `Нет ключевых слов`;

            keywordsParagraph.classList.remove(visibilityClass);
        }

        if (uniqKeywords.length === 1) {
            keywordsParagraph.innerHTML =
                `По ключевому слову: <span class="summary__keyword">${uniqKeywords[0]}</span>`;

            keywordsParagraph.classList.add(visibilityClass);
        }

        if (uniqKeywords.length === 2) {
            console.log(`Два ключевых слова`);

            keywordsParagraph.innerHTML =
                `По ключевым словам: <span class="summary__keyword">${uniqKeywords[0]}</span> и <span
                  class="summary__keyword">${uniqKeywords[1]}</span>`;

            keywordsParagraph.classList.add(visibilityClass);
        }

        if (uniqKeywords.length === 3) {
            keywordsParagraph.innerHTML =
                `По ключевым словам: <span class="summary__keyword">${uniqKeywords[0]}</span>, <span
                  class="summary__keyword">${uniqKeywords[1]}</span> и <span class="summary__keyword summary__keyword-rest">${uniqKeywords[2]}</span>`;

            keywordsParagraph.classList.add(visibilityClass);
        }

        if (uniqKeywords.length >= 4) {
            keywordsParagraph.innerHTML =
                `По ключевым словам: <span class="summary__keyword">${uniqKeywords[0]}</span>, <span
                  class="summary__keyword">${uniqKeywords[1]}</span> и <span class="summary__keyword summary__keyword-rest">${uniqKeywords.length - 2} другим</span>`;


            keywordsParagraph.classList.add(visibilityClass);
        }
    }
}
