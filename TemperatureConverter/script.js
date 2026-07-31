"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("temperature-form");
    const celsiusInput = document.getElementById("celsius-scale");
    const kelvinOutput = document.getElementById("kelvin-scale");
    const fahrenheitOutput = document.getElementById("fahrenheit-scale");

    function celsiusToKelvin(celsius) {
        return celsius + 273.15;
    }

    function celsiusToFahrenheit(celsius) {
        return celsius * 9 / 5 + 32;
    }

    function clearOutputs() {
        kelvinOutput.value = "";
        fahrenheitOutput.value = "";
    }

    function clearFields() {
        clearOutputs();
        celsiusInput.value = "";
    }

    function showError(message, clear = false) {
        alert(message);

        if (clear) {
            clearFields();
        }

        celsiusInput.focus();
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const inputValue = celsiusInput.value.trim();

        if (inputValue === "") {
            showError("Введите температуру");
            return;
        }

        const celsius = Number(inputValue);

        if (Number.isNaN(celsius)) {
            showError("Введите корректное число", true);
            return;
        }

        if (celsius < -273.15) {
            showError("Температура не может быть ниже -273.15°C", true);
            return;
        }

        kelvinOutput.value = `${celsiusToKelvin(celsius).toFixed(2)} K`;
        fahrenheitOutput.value = `${celsiusToFahrenheit(celsius).toFixed(2)} °F`;
    });

    celsiusInput.addEventListener("input", clearOutputs);
});