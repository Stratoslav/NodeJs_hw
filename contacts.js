const fs = require("fs").promises;
const path = require("path");
const shortId = require("shortid");
const contactsPth = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const getContacts = await fs.readFile(contactsPth, { encoding: "ascii" });
  const parsedContacts = JSON.parse(getContacts);

  return parsedContacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  //   const parsedContacts = JSON.parse(contacts);
  const contact = contacts.find((c) => +c.id === contactId);
  console.log(contact);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  //   const parsedContacts = JSON.parse(contacts);
  const deletedContact = contacts.filter((p) => +p.id !== contactId);
  const data = JSON.stringify(deletedContact);
  fs.writeFile(contactsPth, data);
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: shortId.generate(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  const data = JSON.stringify(contacts);
  fs.writeFile(contactsPth, data);
  return contacts;
}

async function updateBody(contactId, body) {
  let oneContact = await getContactById(+contactId);
  let contacts = await listContacts();
  console.log(oneContact);
  const newContact = {
    id: contactId,
    ...body,
  };
  oneContact = newContact;
  contacts.push(oneContact);
  const data = JSON.stringify(contacts);
  fs.writeFile(contactsPth, data);
  return oneContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateBody,
};
