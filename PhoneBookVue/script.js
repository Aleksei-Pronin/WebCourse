"use strict";

Vue.createApp({
    data() {
        return {
            contacts: [],
            filter: "",
            searchText: "",
            selectAll: false,
            newContact: {
                surname: "",
                name: "",
                phone: ""
            },
            errors: {
                surname: "",
                name: "",
                phone: ""
            },
            nextId: 1,
            deleteMessage: "",
            deleteContactIds: []
        };
    },

    computed: {
        filteredContacts() {
            const searchText = this.searchText.trim().toLowerCase();

            if (!searchText) {
                return this.contacts;
            }

            return this.contacts.filter(contact => {
                const contactText =
                    contact.surname + " " +
                    contact.name + " " +
                    contact.phone;

                return contactText.toLowerCase().includes(searchText);
            });
        },

        selectedContacts() {
            return this.contacts.filter(contact => contact.selected);
        }
    },

    methods: {
        addContact() {
            const surname = this.newContact.surname;
            const name = this.newContact.name;
            const phone = this.newContact.phone;

            if (!surname) {
                this.errors.surname = "Заполните поле";
            }

            if (!name) {
                this.errors.name = "Заполните поле";
            }

            if (!phone) {
                this.errors.phone = "Заполните поле";
            }

            if (!surname || !name || !phone) {
                return;
            }

            if (this.isPhoneAlreadyExists(phone, null)) {
                this.errors.phone = "Контакт с таким номером уже добавлен";
                return;
            }

            this.contacts.push({
                id: this.nextId++,
                surname: surname,
                name: name,
                phone: phone,
                selected: false,
                editing: false,
                editSurname: "",
                editName: "",
                editPhone: "",
                surnameError: "",
                nameError: "",
                phoneError: ""
            });

            this.newContact.surname = "";
            this.newContact.name = "";
            this.newContact.phone = "";
        },

        isPhoneAlreadyExists(phone, currentContact) {
            return this.contacts.some(contact => {
                if (currentContact && contact.id === currentContact.id) {
                    return false;
                }

                return contact.phone.trim() === phone;
            });
        },

        deleteContact(contact) {
            this.deleteMessage = "Контакт будет удалён из таблицы";
            this.deleteContactIds = [contact.id];
            this.showDeleteModal();
        },

        deleteSelected() {
            this.deleteMessage = "Количество контактов: " + this.selectedContacts.length;
            this.deleteContactIds = this.selectedContacts.map(contact => contact.id);
            this.showDeleteModal();
        },

        confirmDelete() {
            bootstrap.Modal.getOrCreateInstance(this.$refs.deleteModal).hide();

            this.contacts = this.contacts.filter(contact =>
                !this.deleteContactIds.includes(contact.id)
            );

            this.deleteContactIds = [];
            this.updateSelectAll();
        },

        showDeleteModal() {
            bootstrap.Modal.getOrCreateInstance(this.$refs.deleteModal).show();
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

        editContact(contact) {
            contact.editSurname = contact.surname;
            contact.editName = contact.name;
            contact.editPhone = contact.phone;
            contact.editing = true;
        },

        saveContact(contact) {
            contact.surnameError = "";
            contact.nameError = "";
            contact.phoneError = "";

            const surname = contact.editSurname;
            const name = contact.editName;
            const phone = contact.editPhone;

            if (!surname) {
                contact.surnameError = "Заполните поле";
            }

            if (!name) {
                contact.nameError = "Заполните поле";
            }

            if (!phone) {
                contact.phoneError = "Заполните поле";
            }

            if (!surname || !name || !phone) {
                return;
            }

            if (this.isPhoneAlreadyExists(phone, contact)) {
                contact.phoneError = "Контакт с таким номером уже добавлен";
                return;
            }

            contact.surname = surname;
            contact.name = name;
            contact.phone = phone;
            contact.editing = false;
        },

        cancelEdit(contact) {
            contact.surnameError = "";
            contact.nameError = "";
            contact.phoneError = "";
            contact.editing = false;
        },

        filterContacts() {
            this.searchText = this.filter;
        },

        clearFilter() {
            this.filter = "";
            this.searchText = "";
        }
    }
}).mount("#app");