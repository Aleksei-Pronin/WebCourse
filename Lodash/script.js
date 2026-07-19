"use strict";

(function () {
    const people = [
        {name: 'Анна', age: 25},
        {name: 'Михаил', age: 32},
        {name: 'Елена', age: 22},
        {name: 'Анна', age: 28},
        {name: 'Дмитрий', age: 19},
        {name: 'Ольга', age: 30},
        {name: 'Сергей', age: 26},
        {name: 'Анна', age: 23},
        {name: 'Ирина', age: 35},
        {name: 'Павел', age: 27}
    ];

    const averageAge = _.meanBy(people, "age");
    console.log("Средний возраст: ", averageAge);

    const filteredAndSortedPeople = _.chain(people)
        .filter(person => person.age >= 20 && person.age <= 30)
        .sortBy("age")
        .value();
    console.log("Люди от 20 до 30 лет (по возрастанию): ", filteredAndSortedPeople);

    const uniqueAndSortedNames = _.chain(people)
        .filter(person => person.age >= 20 && person.age <= 30)
        .map('name')
        .uniq()
        .sortBy()
        .reverse()
        .value();
    console.log("Уникальные имена (по убыванию): ", uniqueAndSortedNames);

    const namesCounts = _.countBy(people, "name");
    console.log("Количество людей по именам: ", namesCounts);
})();