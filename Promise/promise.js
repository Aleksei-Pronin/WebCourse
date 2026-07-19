"use strict";

(function () {
    function fetchJson(url) {
        console.log("Начало загрузки с promises");

        fetch(url)
            .then(response => response.json())
            .then(json => console.log("Данные с promises:", json))
            .catch(e => console.log("Ошибка с promises: " + e))
            .finally(() => console.log("Загрузка с promises завершена"));
    }

    fetchJson("https://mdn.github.io/learning-area/javascript/apis/fetching-data/can-store/products.json");
})();