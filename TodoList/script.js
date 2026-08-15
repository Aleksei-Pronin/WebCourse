"use strict";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("new-todo-form");
    const newTodoItemTextField = document.getElementById("new-todo-item-text-field");
    const todoList = document.getElementById("todo-list");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        newTodoItemTextField.classList.remove("invalid");

        let newTodoItemText = newTodoItemTextField.value.trim();

        if (newTodoItemText.length === 0) {
            newTodoItemTextField.classList.add("invalid");
            return;
        }

        const todoItem = document.createElement("li");

        function setViewMode() {
            todoItem.innerHTML = `
                <span class="todo-item-text"></span>

                <div>
                    <button class="edit-button" type="button">Редактировать</button>
                    <button class="delete-button" type="button">Удалить</button>
                </div>
            `;

            todoItem.querySelector(".todo-item-text").textContent = newTodoItemText;

            todoItem.querySelector(".delete-button").addEventListener("click", function () {
                todoItem.remove();
            });

            todoItem.querySelector(".edit-button").addEventListener("click", function () {
                todoItem.innerHTML = `
                    <form class="edit-form">
                        <div class="edit-container">
                            <input class="edit-todo-item-text-field" type="text">
                            <div class="error-message">Необходимо заполнить поле</div>
                        </div>
                        <button class="save-button" type="submit">Сохранить</button>
                        <button class="cancel-button" type="button">Отменить</button>
                    </form>
                `;

                const editTodoItemTextField = todoItem.querySelector(".edit-todo-item-text-field");

                editTodoItemTextField.value = newTodoItemText;

                todoItem.querySelector(".cancel-button").addEventListener("click", function () {
                    setViewMode();
                });

                todoItem.querySelector(".edit-form").addEventListener("submit", function (e) {
                    e.preventDefault();

                    const container = this.querySelector(".edit-container");
                    container.classList.remove("invalid");

                    const editTodoItemText = editTodoItemTextField.value.trim();

                    if (editTodoItemText.length === 0) {
                        container.classList.add("invalid");
                        return;
                    }

                    newTodoItemText = editTodoItemText;
                    setViewMode();
                });
            });
        }

        setViewMode();

        todoList.append(todoItem);

        newTodoItemTextField.value = "";
    });
});