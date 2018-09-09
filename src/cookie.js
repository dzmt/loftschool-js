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
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

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

function getCookieArray () {
    return document.cookie.split('; ');
}

function isMatch (full, chunk) {
    return full.includes(chunk);
}

function filterCookieArray (chunk) {
    return getCookieArray().filter(cookie => {
        return isMatch(cookie, chunk);
    });
}

function clearElement (element) {
    let length = element.childNodes.length;
    
    for (let i = length - 1; i >= 0; i--) {
        element.childNodes[i].remove();
    }
}

function createDocumentFragmentWithTR (filterCookie) {
    let df = document.createDocumentFragment();

    filterCookie.forEach(item => {
        let [name, value] = item.split('=');

        df.appendChild( createTableRow(name, value) )
    });

    return df;
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

function fillTable (chunk) {
    let df = createDocumentFragmentWithTR( filterCookieArray(chunk) );

    clearElement(listTable);
    listTable.appendChild(df)
}

function removeCookie (name) {
    document.cookie = `${name}=;max-age=-1`;
}

fillTable(''); // таблица заполняется существующими cookie

addButton.addEventListener('click', () => {
    let name = addNameInput.value;
    let value = addValueInput.value;
    let cookieItem = `${name}=${value}`;

    document.cookie = cookieItem;
    fillTable(filterNameInput.value);
});

listTable.addEventListener('click', evt => {
    let tr = evt.target.parentElement.parentElement;
    let name = tr.id;

    removeCookie(name);
    tr.remove();
});

filterNameInput.addEventListener('keyup', function() {
    let chunk = filterNameInput.value;

    fillTable(chunk);
});

