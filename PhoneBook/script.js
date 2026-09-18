"use strict";

$(function () {
    Notiflix.Confirm.init({
        borderRadius: "0.375rem",
        titleColor: "#000",
        titleFontSize: "20px",
        okButtonBackground: "#dc3545",
        cancelButtonBackground: "#6c757d"
    });

    const form = $("#contact-form");
    const surnameField = $("#surname");
    const nameField = $("#name");
    const phoneField = $("#phone");
    const contactsBody = $("#contacts-body");
    const selectAll = $("#select-all");
    const deleteSelectedButton = $("#delete-selected-button");
    const filter = $("#filter");
    const filterButton = $("#filter-button");
    const clearFilterButton = $("#clear-filter-button");

    function clearErrors() {
        $(".is-invalid").removeClass("is-invalid");
    }

    function showFieldError(field, message) {
        field.addClass("is-invalid");
        field.siblings(".invalid-feedback").text(message);
    }

    function validateField(field) {
        field.removeClass("is-invalid");

        const fieldValue = field.val().trim();

        if (!fieldValue) {
            field.addClass("is-invalid");
            return null;
        }

        return fieldValue;
    }

    function updateNumbers() {
        contactsBody.find("tr").not(".empty").filter(":visible").each(function (index) {
            $(this).find(".number").text(index + 1);
        });
    }

    function showEmptyRow() {
        if (contactsBody.find("tr").not(".empty").length === 0) {
            contactsBody.html(`
                <tr class="empty">
                    <td colspan="6" class="text-center text-secondary py-4">Нет контактов</td>
                </tr>
            `);

            selectAll.prop("checked", false);
        }
    }

    function updateDeleteSelectedButton() {
        const hasSelected = contactsBody.find(".select-contact:checked")
            .closest("tr")
            .filter(":visible")
            .length > 0;

        deleteSelectedButton.toggle(hasSelected);
    }

    function deleteRows(rows) {
        rows.remove();
        showEmptyRow();
        updateNumbers();
        updateDeleteSelectedButton();
    }

    function isPhoneAlreadyExists(phone, currentRow) {
        let exists = false;

        contactsBody.find("tr").not(".empty").each(function () {
            const row = $(this);

            if (currentRow && row.is(currentRow)) {
                return;
            }

            if (row.find(".phone").text().trim() === phone) {
                exists = true;
            }
        });

        return exists;
    }

    function setEditField(cell, type, value) {
        cell.html(`
            <div class="edit-field">
                <input class="form-control" type="${type}">
                <div class="invalid-feedback">Заполните поле</div>
            </div>
        `);

        cell.find("input").val(value);
    }

    function setEditMode(row, isEditing) {
        row.find(".edit-button, .delete-button").toggle(!isEditing);
        row.find(".save-button, .cancel-button").toggle(isEditing);
    }

    form.on("submit", e => {
        e.preventDefault();

        clearErrors();

        const surname = validateField(surnameField);
        const name = validateField(nameField);
        const phone = validateField(phoneField);

        if (surname === null || name === null || phone === null) {
            return;
        }

        if (isPhoneAlreadyExists(phone, null)) {
            showFieldError(phoneField, "Контакт с таким номером уже добавлен");
            return;
        }

        contactsBody.find(".empty").remove();

        const newContactRow = $(`
            <tr>
                <td class="text-center">
                    <input type="checkbox" class="select-contact">
                </td>
                <td class="number text-center"></td>
                <td class="surname"></td>
                <td class="name"></td>
                <td class="phone"></td>
                <td class="actions-cell text-center">
                    <button class="btn btn-sm btn-outline-primary edit-button" type="button" title="Редактировать">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-button" type="button" title="Удалить">
                        <i class="bi bi-trash"></i>
                    </button>
                    <button class="btn btn-sm btn-success save-button" type="button" title="Сохранить">
                        <i class="bi bi-check-lg"></i>
                    </button>
                    <button class="btn btn-sm btn-secondary cancel-button" type="button" title="Отменить">
                        <i class="bi bi-x-lg"></i>
                    </button>
                </td>
            </tr>
        `);

        newContactRow.find(".surname").text(surname);
        newContactRow.find(".name").text(name);
        newContactRow.find(".phone").text(phone);

        contactsBody.append(newContactRow);
        setEditMode(newContactRow, false);

        form[0].reset();
        clearErrors();
        updateNumbers();
    });

    selectAll.on("change", () => {
        contactsBody.find(".select-contact")
            .closest("tr")
            .filter(":visible")
            .find(".select-contact")
            .prop("checked", selectAll.prop("checked"));

        updateDeleteSelectedButton();
    });

    contactsBody.on("change", ".select-contact", function () {
        if (!$(this).prop("checked")) {
            selectAll.prop("checked", false);
        }

        updateDeleteSelectedButton();
    });

    contactsBody.on("click", ".delete-button", function () {
        const row = $(this).closest("tr");

        Notiflix.Confirm.show(
            "Удалить контакт?",
            "Контакт будет удалён из таблицы",
            "Удалить",
            "Отмена",
            function () {
                deleteRows(row);
            }
        );
    });

    deleteSelectedButton.on("click", function () {
        const selectedRows = contactsBody
            .find(".select-contact:checked")
            .closest("tr")
            .filter(":visible");

        Notiflix.Confirm.show(
            "Удалить выбранные контакты?",
            "Количество контактов: " + selectedRows.length,
            "Удалить",
            "Отмена",
            function () {
                deleteRows(selectedRows);
            }
        );
    });

    contactsBody.on("click", ".edit-button", function () {
        const row = $(this).closest("tr");

        row.data("surname", row.find(".surname").text());
        row.data("name", row.find(".name").text());
        row.data("phone", row.find(".phone").text());

        setEditField(row.find(".surname"), "text", row.data("surname"));
        setEditField(row.find(".name"), "text", row.data("name"));
        setEditField(row.find(".phone"), "tel", row.data("phone"));

        setEditMode(row, true);
    });

    contactsBody.on("click", ".save-button", function () {
        const row = $(this).closest("tr");

        const surname = validateField(row.find(".surname input"));
        const name = validateField(row.find(".name input"));
        const phone = validateField(row.find(".phone input"));

        if (surname === null || name === null || phone === null) {
            return;
        }

        if (isPhoneAlreadyExists(phone, row)) {
            showFieldError(row.find(".phone input"), "Контакт с таким номером уже добавлен");
            return;
        }

        row.find(".surname").text(surname);
        row.find(".name").text(name);
        row.find(".phone").text(phone);

        setEditMode(row, false);
    });

    contactsBody.on("click", ".cancel-button", function () {
        const row = $(this).closest("tr");

        row.find(".surname").text(row.data("surname"));
        row.find(".name").text(row.data("name"));
        row.find(".phone").text(row.data("phone"));

        setEditMode(row, false);
    });

    filterButton.on("click", function () {
        const searchText = filter.val().trim().toLowerCase();

        contactsBody.find("tr").not(".empty").each(function () {
            const row = $(this);
            const rowText = row.find(".surname, .name, .phone").map((index, element) =>
                $(element).text()
            ).get().join(" ").toLowerCase();
            row.toggle(rowText.includes(searchText));
        });

        updateNumbers();
        updateDeleteSelectedButton();
    });

    clearFilterButton.on("click", () => {
        filter.val("");
        contactsBody.find("tr").not(".empty").show();
        updateNumbers();
        updateDeleteSelectedButton();
    });

    updateNumbers();
    updateDeleteSelectedButton();
});