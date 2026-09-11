"use strict";

Vue.createApp({
    data() {
        return {
            newTodoItemText: "",
            items: [],
            isNewTodoItemTextInvalid: false,
            currentItemId: 1,
            confirmDeleteDialog: null,
            todoItemToDelete: null
        };
    },

    mounted() {
        const modal = this.$refs.confirmDeleteDialog;
        this.confirmDeleteDialog = new bootstrap.Modal(modal);
    },

    methods: {
        addTodoItem() {
            this.isNewTodoItemTextInvalid = false;

            const newTodoItemText = this.newTodoItemText.trim();

            if (newTodoItemText.length === 0) {
                this.isNewTodoItemTextInvalid = true;
                return;
            }

            this.items.push({
                id: this.currentItemId,
                text: newTodoItemText,
                isEditing: false,
                isInvalid: false,
                editingTodoItemText: ""
            });

            ++this.currentItemId;

            this.newTodoItemText = "";
        },

        confirmRemove(item) {
            this.todoItemToDelete = item;
            this.confirmDeleteDialog.show();
        },

        removeTodoItem() {
            this.items = this.items.filter(item => item.id !== this.todoItemToDelete.id);
            this.todoItemToDelete = null;
            this.confirmDeleteDialog.hide();
        },

        startEditing(item) {
            item.editingTodoItemText = item.text;
            item.isEditing = true;
            item.isInvalid = false;
        },

        saveTodoItem(item) {
            item.isInvalid = false;

            const editingTodoItemText = item.editingTodoItemText.trim();

            if (editingTodoItemText.length === 0) {
                item.isInvalid = true;
                return;
            }

            item.text = editingTodoItemText;
            item.isEditing = false;
        },

        cancelEdit(item) {
            item.isEditing = false;
            item.isInvalid = false;
        }
    }
}).mount("#app");