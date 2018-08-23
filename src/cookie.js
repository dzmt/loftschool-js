/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

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
// текстовое поле для фильтрации cookie
// const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// filterNameInput.addEventListener('keyup', function() {
//     // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
// });

function createTableRow (cookieName, cookieValue) {
    let tr = document.createElement('tr');
    let tdName = document.createElement('td');
    let tdValue = document.createElement('td');
    let tdButton = document.createElement('td');
    let button = document.createElement('button');

    tr.id = cookieName;
    tdName.textContent = cookieName;
    tdValue.textContent = cookieValue;
    button.textContent = 'Удалить';

    tdButton.appendChild(button);
    tr.appendChild(tdName);
    tr.appendChild(tdValue);
    tr.appendChild(tdButton);

    return tr;
}

function createCookieObject () {
    if (!document.cookie) {
        return;
    }

    let cookieMap = {};
    
    document.cookie
        .split('; ')
        .reduce((cookieMap, item) => {
            let [name, value] = item.split('=');

            cookieMap[name] = value;

            return cookieMap;
        }, cookieMap);

    return cookieMap;
}

function refreshCookieValue (name, value) {
    let tr = document.all[name];

    tr.children[1].textContent = value;
}

function addCookieToTable (name, value) {
    listTable.appendChild( createTableRow(name, value) );
}

function initTable () {
    let cookie = createCookieObject();

    for (let name in cookie) {
        if (cookie.hasOwnProperty(name)) {
            addCookieToTable(name, cookie[name]);
        }
    }
}

function removeCookie (name) {
    document.cookie = `${name}=;max-age=-1`;
}

initTable();

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    let name = addNameInput.value;
    let value = addValueInput.value;
    let cookieItem = `${name}=${value}`;
    let cookie = createCookieObject();

    addNameInput.value = '';
    addValueInput.value = '';

    if ( cookie && cookie[name]) {
        refreshCookieValue(name, value);
    } else {
        addCookieToTable(name, value);
    }
    
    document.cookie = cookieItem;
});

listTable.addEventListener('click', evt => {
    let tr = evt.target.parentElement.parentElement;
    let name = tr.id;

    removeCookie(name);
    tr.remove();
})

