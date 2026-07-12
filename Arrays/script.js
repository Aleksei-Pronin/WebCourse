"use strict";

(function () {
    function getDescendingSortedArray(array) {
        return array.sort((a, b) => b - a);
    }

    function getFirstNElements(array, count) {
        return array.slice(0, count);
    }

    function getLastNElements(array, count) {
        return array.slice(-count);
    }

    function getEvenNumbersSum(array) {
        return array.reduce((sum, element) => element % 2 === 0 ? sum + element : sum, 0);
    }

    function createArrayFrom1To100() {
        const array = [];

        for (let i = 1; i <= 100; i++) {
            array.push(i);
        }

        return array;
    }

    function getEvenNumbersSquares(array) {
        return array.filter(number => number % 2 === 0).map(number => number * number);
    }

    const array = [23, 45, 8, 53, 57, 98, 1, 46, 37, 76, 17, 68, 13, 5];
    const COUNT = 5;

    console.log("Исходный массив: ", array);
    console.log("Отсортированный по убыванию массив: ", getDescendingSortedArray(array));
    console.log("Первые 5 элементов: ", getFirstNElements(array, COUNT));
    console.log("Последние 5 элементов: ", getLastNElements(array, COUNT));
    console.log("Сумма четных элементов: ", getEvenNumbersSum(array));

    const arrayFrom1To100 = createArrayFrom1To100();
    console.log("Массив от 1 до 100: ", arrayFrom1To100);
    console.log("Квадраты четных чисел: ", getEvenNumbersSquares(arrayFrom1To100));
})();