"use strict";

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("temperature-form");
    const celsiusInput = document.getElementById("celsius-scale");
    const kelvinOutput = document.getElementById("kelvin-scale");
    const fahrenheitOutput = document.getElementById("fahrenheit-scale");

    const ABSOLUTE_ZERO_CELSIUS = -273.15;

    function convertCelsiusToKelvin(celsius) {
        return celsius - ABSOLUTE_ZERO_CELSIUS;
    }

    function convertCelsiusToFahrenheit(celsius) {
        return celsius * 9 / 5 + 32;
    }

    function clearOutputs() {
        kelvinOutput.value = "";
        fahrenheitOutput.value = "";
    }

    function showError(message) {
        alert(message);
        celsiusInput.focus();
    }

    function extractCelsius(value) {
        const cleanValue = value.replace(/[°℃]\s*C?|C\s*$/i, "").trim();
        return Number(cleanValue);
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();

        const celsiusInputString = celsiusInput.value.trim();

        if (celsiusInputString === "") {
            showError("Введите температуру в градусах Цельсия");
            return;
        }

        const celsius = extractCelsius(celsiusInputString);

        if (Number.isNaN(celsius)) {
            showError("Введите корректное значение температуры в градусах Цельсия");
            return;
        }

        if (celsius < ABSOLUTE_ZERO_CELSIUS) {
            showError(`Температура не может быть ниже ${ABSOLUTE_ZERO_CELSIUS} °C`);
            return;
        }

        celsiusInput.value = `${celsius} °C`;
        kelvinOutput.value = `${convertCelsiusToKelvin(celsius).toFixed(2)} K`;
        fahrenheitOutput.value = `${convertCelsiusToFahrenheit(celsius).toFixed(2)} °F`;
    });

    celsiusInput.addEventListener("input", clearOutputs);
});