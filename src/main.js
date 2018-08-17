
const homeworkContainer = document.querySelector('#homework-container');

function loadTowns() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        
        xhr.addEventListener('load', () => {
            let towns = xhr.response;

            resolve(towns.sort((left, right) => {
                return left.name > right.name ? 1 : -1;
            }));
        });

        xhr.send();
    });
}

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function() {
    // это обработчик нажатия кливиш в текстовом поле
    console.log(filterInput.value);
    
});

