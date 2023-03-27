const mongoose = require("mongoose");
const { version } = require("process");

const contactsSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

class Contacts {
  constructor() {
    this.db = mongoose.model("Contacts", contactsSchema);
  }
  getUser = async () => {
    return await this.db.find();
  };
  getFavoriteContacts = async () => {
    return await this.db.find();
  };
  getContactById = async (id) => {
    return await this.db.findById(id);
  };
  removeContact = async (id) => {
    return await this.db.findByIdAndRemove(id);
  };
  addContact = async (data) => {
    console.log(data);
    return await this.db.create(data);
  };
  updateContact = async (id, data) => {
    return await this.db.findByIdAndUpdate(id, data);
  };
  // favriteContact = async (d, data)
}

module.exports = new Contacts();
