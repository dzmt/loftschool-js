const homeworkContainer = document.querySelector('#homework-container');

function loadTowns() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.responseType = 'json';
        
        xhr.addEventListener('load', () => {
            let status = xhr.status;
            
            if (status === 200) {
                let towns = xhr.response;

                resolve(towns.sort((left, right) => {
                    return left.name > right.name ? 1 : -1;
                }));
            } else {
                reject(status);
            }
        });

        xhr.addEventListener('error', () => {
           reject();
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

function creatRepeatBlock() {
    let div = document.createElement('div');
    let p = document.createElement('p');
    let button = document.createElement('button');

    div.id = 'repeat-block';
    div.style.display = 'none';
    p.textContent = 'Не удалось загрузить города';
    button.textContent = 'Повторить';
    
    button.addEventListener('click', () => {
        main();
        div.style.display = 'none';
    });

    div.appendChild(p);
    div.appendChild(button);
    homeworkContainer.appendChild(div);
};

function main(){
    if (!document.querySelector('#repeat-block')) {
        creatRepeatBlock();
    }

    loadTowns()
    .then(towns => {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = '';
        
        filterInput.addEventListener('keyup', function() {
            let chunk = filterInput.value;
            let filterTowns = towns.filter(t => isMatching(t.name, chunk));
        
            filterResult.textContent = '';
        
            if (chunk) {
                let str = '';
        
                for (let town of filterTowns) {
                    str += town.name + '<br>';
                }
                
                filterResult.innerHTML = str;
            }
        });
    })
    .catch(() => {
        loadingBlock.style.display = 'none';
        document.querySelector('#repeat-block').style.display = '';
        
    });
};

main();
