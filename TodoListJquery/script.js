"use strict";

$(function () {
    const form = $("#new-todo-form");
    const newTodoItemTextField = $("#new-todo-item-text-field");
    const todoList = $("#todo-list");

    form.on("submit", function (e) {
        e.preventDefault();

        newTodoItemTextField.removeClass("invalid");

        let newTodoItemText = newTodoItemTextField.val().trim();

        if (newTodoItemText.length === 0) {
            newTodoItemTextField.addClass("invalid");
            return;
        }

        const todoItem = $("<li>");

        function setViewMode() {
            todoItem.html(`
                <span class="todo-item-text"></span>

                <div>
                    <button class="edit-button" type="button">Редактировать</button>
                    <button class="delete-button" type="button">Удалить</button>
                </div>
            `);

            todoItem.find(".todo-item-text").text(newTodoItemText);

            todoItem.find(".delete-button").on("click", function () {
                todoItem.remove();
            });

            todoItem.find(".edit-button").on("click", function () {
                todoItem.html(`
                    <form class="edit-form">
                        <div class="edit-container">
                            <input class="edit-todo-item-text-field" type="text">
                            <div class="error-message">Необходимо заполнить поле</div>
                        </div>
                        <button class="save-button" type="submit">Сохранить</button>
                        <button class="cancel-button" type="button">Отменить</button>
                    </form>
                `);

                const editTodoItemTextField = todoItem.find(".edit-todo-item-text-field");

                editTodoItemTextField.val(newTodoItemText);

                todoItem.find(".cancel-button").on("click", function () {
                    setViewMode();
                });

                todoItem.find(".edit-form").on("submit", function (e) {
                    e.preventDefault();

                    const container = todoItem.find(".edit-container");
                    container.removeClass("invalid");

                    const editTodoItemText = editTodoItemTextField.val().trim();

                    if (editTodoItemText.length === 0) {
                        container.addClass("invalid");
                        return;
                    }

                    newTodoItemText = editTodoItemText;
                    setViewMode();
                });
            });
        }

        setViewMode();

        todoList.append(todoItem);

        newTodoItemTextField.val("");
    });
});