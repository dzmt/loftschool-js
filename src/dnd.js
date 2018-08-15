/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let getRandomNumberTo = function (number) {
        return Math.ceil(Math.random() * number);
    }
    let div = document.createElement('div');
    let color = `rgb(${getRandomNumberTo(256)},${getRandomNumberTo(256)},${getRandomNumberTo(256)})`
    
    div.classList.add('draggable-div');
    div.style.backgroundColor = color;
    div.style.width = `${getRandomNumberTo(500) + 1}px`;
    div.style.height = `${getRandomNumberTo(500) + 1}px`;
    div.style.top = `${getRandomNumberTo(500) + 1}px`;
    div.style.left = `${getRandomNumberTo(500) + 1}px`
    div.style.position = 'absolute';
    div.draggable = true;

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {

    let deltaX = null;
    let deltaY = null;

    target.addEventListener('dragstart', evt => {
        deltaX = evt.target.offsetLeft - evt.clientX;
        deltaY = evt.target.offsetTop - evt.clientY;        
    })
    target.addEventListener('dragend', evt => {
        
        target.style.top = evt.clientY + deltaY + 'px';
        target.style.left = evt.clientX + deltaX + 'px';
    });
    
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();
    
    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
