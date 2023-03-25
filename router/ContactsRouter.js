const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateBody,
} = require("../contacts");
const contactsSchema = require("../schema/contactsSchema");

const contactsRouter = express.Router();

contactsRouter.get("/contacts", async (req, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

contactsRouter.get("/contacts/:id", async (req, res) => {
  const { id } = req.params;

  if (id) {
    const contactById = await getContactById(+id);
    res.status(200).json(contactById);
  } else {
    res.status(404).send({ message: "not Found" });
  }
});
contactsRouter.post("/contacts", async (req, res) => {
  const { name, email, phone } = req.body;
  const data = await contactsSchema.validateAsync({
    name: name,
    email: email,
    phone: phone,
  });

  if (data) {
    const add = await addContact(name, email, phone);
    res.status(201).json(add);
  } else {
    res.status(400).send({ message: "missing required name field" });
  }
});

contactsRouter.delete("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const deleted = removeContact(+id);
    res.status(200).send({ message: "contact deleted" });

    return deleted;
  } else {
    res.status(404).send({ message: "Not found" });
  }
});
contactsRouter.put("/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  if (id && body !== {}) {
    const getUpdateContact = await updateBody(+id, body);
    console.log(getUpdateContact);
    res.status(200).json(getUpdateContact);
    return getUpdateContact;
  } else if (body === {} || body === undefined) {
    res.status(400).json({ message: "missing fields" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});
module.exports = contactsRouter;
