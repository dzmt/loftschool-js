/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let mappedArray = [];

    for (let i = 0; i < array.length; i++) {
        mappedArray.push(fn(array[i], i, array));
    }

    return mappedArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let i = 0;
    let accumulator = initial;

    if (initial !== 0 && !initial) {
        [accumulator] = array;
        i++;
    }

    for (; i < array.length; i++) {
        accumulator = fn(accumulator, array[i], i, array);
    }

    return accumulator;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    var props = [];

    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            props.push(prop.toUpperCase());
        }
    }
    
    return props;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let newArray = [];
    let i = from;
    let length = to < array.length ? to : array.length;

    if (!from) {
        i = 0;
    } else if (from < 0) {
        let start = array.length + i;

        i = start < 0 ? 0 : start
    }

    if (to !== 0 && !to) {
        length = array.length;
    } else if (to < 0) {
        let end = array.length + to;

        length = end < array.length ? end : array.length;
    }

    for (; i < length; i++) {
        newArray.push(array[i]);
    }

    return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(target, prop, value) {
            target[prop] = value * value;
            
            return true;
        }
    })
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
