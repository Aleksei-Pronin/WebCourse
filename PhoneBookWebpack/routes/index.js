const express = require("express");
const router = express.Router();

let contacts = [];
let currentContactId = 1;

router.get("/api/contact", function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    if (term.length === 0) {
        res.send(contacts);
    } else {
        res.send(contacts.filter(c => (c.surname + " " + c.name + " " + c.phone).toUpperCase().includes(term)));
    }
});

router.post("/api/contact", function (req, res) {
    const contact = getContactData(req, res);

    if (!contact) {
        return;
    }

    const phoneInUpperCase = contact.phone.toUpperCase();

    if (contacts.some(c => c.phone.toUpperCase() === phoneInUpperCase)) {
        res.send({
            success: false,
            message: "Уже есть контакт с таким номером"
        });
        return;
    }

    contacts.push({
        id: currentContactId,
        surname: contact.surname,
        name: contact.name,
        phone: contact.phone
    });

    ++currentContactId;

    res.send({
        success: true,
        message: null
    });
});

router.put("/api/contact/:id", function (req, res) {
    const id = Number(req.params.id);
    const contact = getContactData(req, res);

    if (!contact) {
        return;
    }

    const contactIndex = contacts.findIndex(c => c.id === id);

    if (contactIndex === -1) {
        res.send({
            success: false,
            message: "Контакт не найден"
        });
        return;
    }

    const phoneInUpperCase = contact.phone.toUpperCase();

    const isPhoneExists = contacts.some(c =>
        c.id !== id &&
        c.phone.toUpperCase() === phoneInUpperCase
    );

    if (isPhoneExists) {
        res.send({
            success: false,
            message: "Уже есть другой контакт с таким номером"
        });
        return;
    }

    contacts[contactIndex] = {
        id,
        surname: contact.surname,
        name: contact.name,
        phone: contact.phone
    };

    res.send({
        success: true,
        message: null
    });
});

router.delete("/api/contact/:id", function (req, res) {
    const id = Number(req.params.id);
    const contactIndex = contacts.findIndex(c => c.id === id);

    if (contactIndex === -1) {
        res.send({
            success: false,
            message: "Контакт не найден"
        });
        return;
    }

    contacts.splice(contactIndex, 1);

    res.send({
        success: true,
        message: null
    });
});

function validateContact(surname, name, phone) {
    if (!surname) {
        return "Необходимо заполнить фамилию";
    }

    if (!name) {
        return "Необходимо заполнить имя";
    }

    if (!phone) {
        return "Необходимо заполнить номер телефона";
    }

    return null;
}

function getContactData(req, res) {
    const surname = (req.body.surname || "").trim();
    const name = (req.body.name || "").trim();
    const phone = (req.body.phone || "").trim();

    const validationMessage = validateContact(surname, name, phone);

    if (validationMessage) {
        res.send({
            success: false,
            message: validationMessage
        });
        return null;
    }

    return {
        surname,
        name,
        phone
    };
}

module.exports = router;