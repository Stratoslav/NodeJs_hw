const fs = require("fs").promises;
const path = require("path");

const contactsPth = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const getContacts = await fs.readFile(contactsPth, { encoding: "ascii" });
  JSON.parse(getContacts);
  console.log(getContacts);
  return getContacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const parsedContacts = JSON.parse(contacts);
  const contact = parsedContacts.find((c) => +c.id === contactId);
  console.log(contact);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const parsedContacts = JSON.parse(contacts);
  const deletedContact = parsedContacts.filter((p) => +p.id !== contactId);
  console.log(deletedContact);
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const parsedContacts = JSON.parse(contacts);

  const newContact = {
    id: 64,
    name: name,
    email: email,
    phone: phone,
  };
  const pushedContact = parsedContacts.push(newContact);
  console.log(pushedContact);
  return pushedContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
