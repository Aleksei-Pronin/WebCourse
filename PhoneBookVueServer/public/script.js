"use strict";

const ERROR_TITLE = "Ошибка";
const DELETE_TITLE = "Подтвердите удаление";
const OK_BUTTON = "ОК";
const CANCEL_BUTTON = "Отмена";

class ContactsService {
    static baseUrl = "/api/contact";

    getContacts(term) {
        return axios.get(ContactsService.baseUrl, {
            params: {term}
        }).then(response => response.data);
    }

    addContact(contact) {
        return axios.post(ContactsService.baseUrl, contact)
            .then(response => response.data);
    }

    editContact(contactId, contact) {
        return axios.put(ContactsService.baseUrl + "/" + contactId, contact)
            .then(response => response.data);
    }

    deleteContact(contactId) {
        return axios.delete(ContactsService.baseUrl + "/" + contactId)
            .then(response => response.data);
    }
}

Vue.createApp({
    data() {
        return {
            contacts: [],
            editingContacts: {},
            surname: "",
            name: "",
            phone: "",
            searchText: "",
            isNewSurnameInvalid: false,
            isNewNameInvalid: false,
            isNewPhoneInvalid: false,
            isPhoneError: false,
            selectAll: false,
            service: new ContactsService()
        };
    },

    created() {
        this.getContacts();
    },

    computed: {
        selectedContacts() {
            return this.contacts.filter(contact => contact.selected);
        }
    },

    methods: {
        getContacts() {
            this.service.getContacts(this.searchText)
                .then(contacts => {
                    this.contacts = contacts.map(contact => ({
                        ...contact,
                        selected: false
                    }));
                    this.selectAll = false;
                })
                .catch(() => {
                    Notiflix.Report.failure(ERROR_TITLE, "Не удалось загрузить список контактов", OK_BUTTON);
                });
        },

        addContact() {
            this.isPhoneError = false;

            this.isNewSurnameInvalid = !this.surname.trim();
            this.isNewNameInvalid = !this.name.trim();
            this.isNewPhoneInvalid = !this.phone.trim();

            if (
                this.isNewSurnameInvalid ||
                this.isNewNameInvalid ||
                this.isNewPhoneInvalid
            ) {
                return;
            }

            const contact = {
                surname: this.surname.trim(),
                name: this.name.trim(),
                phone: this.phone.trim()
            };

            this.service.addContact(contact)
                .then(response => {
                    if (!response.success) {
                        this.isPhoneError = true;
                        Notiflix.Report.failure(ERROR_TITLE, response.message, OK_BUTTON);
                        return;
                    }

                    this.surname = "";
                    this.name = "";
                    this.phone = "";

                    this.isNewSurnameInvalid = false;
                    this.isNewNameInvalid = false;
                    this.isNewPhoneInvalid = false;
                    this.isPhoneError = false;

                    this.getContacts();
                })
                .catch(() => {
                    Notiflix.Report.failure(ERROR_TITLE, "Не удалось добавить контакт", OK_BUTTON);
                });
        },

        startEdit(contact) {
            if (!contact || !contact.id) {
                return;
            }

            this.editingContacts[contact.id] = {
                surname: contact.surname,
                name: contact.name,
                phone: contact.phone,
                isSurnameInvalid: false,
                isNameInvalid: false,
                isPhoneInvalid: false,
                isPhoneError: false
            };
        },

        cancelEdit(contactId) {
            delete this.editingContacts[contactId];
        },

        editContact(contactId) {
            const editContact = this.editingContacts[contactId];

            if (!editContact) {
                return;
            }

            editContact.isPhoneError = false;

            editContact.isSurnameInvalid = !editContact.surname.trim();
            editContact.isNameInvalid = !editContact.name.trim();
            editContact.isPhoneInvalid = !editContact.phone.trim();

            if (
                editContact.isSurnameInvalid ||
                editContact.isNameInvalid ||
                editContact.isPhoneInvalid
            ) {
                return;
            }

            const contact = {
                surname: editContact.surname.trim(),
                name: editContact.name.trim(),
                phone: editContact.phone.trim()
            };

            this.service.editContact(contactId, contact)
                .then(response => {
                    if (!response.success) {
                        editContact.isPhoneError = true;
                        Notiflix.Report.failure(ERROR_TITLE, response.message, OK_BUTTON);
                        return;
                    }

                    delete this.editingContacts[contactId];
                    this.getContacts();
                })
                .catch(() => {
                    Notiflix.Report.failure(ERROR_TITLE, "Ошибка при сохранении изменений", OK_BUTTON);
                });
        },

        deleteContact(contact) {
            Notiflix.Confirm.show(
                DELETE_TITLE,
                "Контакт будет удалён из таблицы",
                OK_BUTTON,
                CANCEL_BUTTON,
                () => {
                    this.service.deleteContact(contact.id)
                        .then(response => {
                            if (!response.success) {
                                Notiflix.Report.failure(ERROR_TITLE, response.message, OK_BUTTON);
                                return;
                            }

                            this.getContacts();
                        })
                        .catch(() => {
                            Notiflix.Report.failure(ERROR_TITLE, "Не удалось удалить контакт", OK_BUTTON);
                        });
                }
            );
        },

        deleteSelected() {
            Notiflix.Confirm.show(
                DELETE_TITLE,
                "Количество контактов: " + this.selectedContacts.length,
                OK_BUTTON,
                CANCEL_BUTTON,
                () => {
                    const requests = this.selectedContacts.map(contact =>
                        this.service.deleteContact(contact.id)
                    );

                    Promise.all(requests)
                        .then(responses => {
                            const failedResponse = responses.find(
                                response => !response.success
                            );

                            if (failedResponse) {
                                Notiflix.Report.failure(ERROR_TITLE, failedResponse.message, OK_BUTTON);
                                return;
                            }

                            this.getContacts();
                        })
                        .catch(() => {
                            Notiflix.Report.failure(ERROR_TITLE, "Не удалось удалить контакты", OK_BUTTON);
                        });
                }
            );
        },

        selectAllContacts() {
            this.contacts.forEach(contact => {
                contact.selected = this.selectAll;
            });
        },

        updateSelectAll() {
            if (this.contacts.length === 0) {
                this.selectAll = false;
                return;
            }

            this.selectAll = this.contacts.every(contact => contact.selected);
        },

        clearFilter() {
            this.searchText = "";
            this.getContacts();
        }
    }
}).mount("#app");

Notiflix.Confirm.init({
    borderRadius: "0.375rem",
    titleColor: "#000",
    titleFontSize: "20px",
    okButtonBackground: "#0d6efd",
    cancelButtonBackground: "#6c757d"
});

Notiflix.Report.init({
    borderRadius: "0.375rem",
    titleFontSize: "20px",
    failure: {
        buttonBackground: "#0d6efd"
    }
});