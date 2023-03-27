const contactsDB = require("./contacts.schema");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await contactsDB.getUser();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};
const getContactsByIdController = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (id) {
      const contacts = await contactsDB.getContactById(id);
      res.json(contacts);
    }
  } catch (e) {
    next(e);
  }
};
const deleteContactController = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deleteContact = await contactsDB.removeContact(id);
    res.json(deleteContact);
  } catch (e) {
    next(e);
  }
};
const addNewContactsController = async (req, res, next) => {
  try {
    const { body } = req;
    if (body !== {}) {
      const newContact = await contactsDB.addContact(body);
      res.json(newContact);
    }
  } catch (e) {
    next(e);
  }
};
const updateContactController = async (req, res, next) => {
  try {
    const { ...data } = req.body;
    console.log(data);
    const { id } = req.params;
    if (data !== {} && id) {
      const updateContact = await contactsDB.updateContact(id, data);
      res.json(updateContact);
    }
  } catch (e) {
    next(e);
  }
};
const updateFavoriteContactsController = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    console.log(id, data);

    const contacts = await contactsDB.getUser();
    favoriteContacts = contacts.filter((f) => f.favorite === true);
    res.json(favoriteContacts);
  } catch (e) {
    next(e);
  }
};
module.exports = {
  getContactsController,
  getContactsByIdController,
  deleteContactController,
  addNewContactsController,
  updateContactController,
  updateFavoriteContactsController,
};
