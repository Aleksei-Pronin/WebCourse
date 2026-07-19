"use strict";

(function () {
    const countries = [
        {
            name: "Россия",
            cities: [
                {name: "Москва", population: 13000000},
                {name: "Санкт-Петербург", population: 5600000},
                {name: "Новосибирск", population: 1600000},
                {name: "Екатеринбург", population: 1500000},
                {name: "Казань", population: 1300000}
            ]
        },
        {
            name: "США",
            cities: [
                {name: "Нью-Йорк", population: 8400000},
                {name: "Лос-Анджелес", population: 3900000},
                {name: "Вашингтон", population: 5600000},
                {name: "Чикаго", population: 2700000},
                {name: "Хьюстон", population: 2300000}
            ]
        },
        {
            name: "Китай",
            cities: [
                {name: "Пекин", population: 21500000},
                {name: "Шанхай", population: 24800000},
                {name: "Гуанчжоу", population: 15000000},
                {name: "Шэньчжэнь", population: 13000000}
            ]
        },
        {
            name: "Франция",
            cities: [
                {name: "Париж", population: 2200000},
                {name: "Марсель", population: 870000},
                {name: "Лион", population: 520000}
            ]
        }
    ];

    function getCountriesWithMaxCitiesCount(countries) {
        const maxCitiesCount = countries.reduce((max, country) => Math.max(max, country.cities.length), 0);
        return countries.filter(country => country.cities.length === maxCitiesCount);
    }

    function getPopulationsByCountries(countries) {
        const populationsByCountries = {};

        countries.forEach(country => {
            populationsByCountries[country.name] = country.cities.reduce((sum, city) => sum + city.population, 0);
        });

        return populationsByCountries;
    }

    console.log("Страны:", countries);
    console.log("Страны с максимальным количеством городов:", getCountriesWithMaxCitiesCount(countries));
    console.log("Суммарная численность по странам:", getPopulationsByCountries(countries));
})();