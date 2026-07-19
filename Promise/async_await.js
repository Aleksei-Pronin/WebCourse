"use strict";

(async function () {
    async function fetchJson(url) {
        console.log("Начало загрузки с async/await");

        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log("Данные с async/await:", json);
        } catch (e) {
            console.log("Ошибка с async/await: " + e);
        } finally {
            console.log("Загрузка с async/await завершена");
        }
    }

    await fetchJson("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
})();