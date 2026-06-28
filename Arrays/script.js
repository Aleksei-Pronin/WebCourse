(() => {
    const createArray = () => [23, 45, 8, 53, 57, 98, 1, 46, 37, 76, 17, 68, 13, 5];
    const getDescSortedArray = (array) => array.slice().sort((e1, e2) => e2 - e1);
    const getFirstFiveElements = (array) => array.slice(0, 5);
    const getLastFiveElements = (array) => array.slice(-5);
    const getEvenElementsSum = (array) => array.filter(e => e % 2 === 0).reduce((sum, e) => sum + e, 0);

    const createArrayFrom1To100 = () => {
        const array = [];

        for (let i = 1; i <= 100; i++) {
            array.push(i);
        }

        return array;
    };
    const getEvenElementsSquares = (array) => array.filter(num => num % 2 === 0).map(num => num ** 2);

    const array = createArray();
    console.log("Исходный массив: ", array);
    console.log("Отсортированный по убыванию массив: ", getDescSortedArray(array));
    console.log("Первые 5 элементов: ", getFirstFiveElements(array));
    console.log("Последние 5 элементов: ", getLastFiveElements(array));
    console.log("Сумма четных элементов: ", getEvenElementsSum(array));

    const arrayFrom1To100 = createArrayFrom1To100();
    console.log("Массив от 1 до 100: ", arrayFrom1To100);
    console.log("Квадраты четных чисел: ",getEvenElementsSquares(arrayFrom1To100));
})();