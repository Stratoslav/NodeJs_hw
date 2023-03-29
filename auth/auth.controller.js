const contactsDB = require("../contacts.schema");
const bcrypt = require("bcrypt");
const { createVerifyToken } = require("../services/token.services");
const registrationController = async (req, res, next) => {
  try {
    const { body } = req;
    if (body !== {}) {
      const hashedPassword = await bcrypt.hash(
        body.password,
        +process.env.SALT
      );

      await contactsDB.addContact({
        ...body,
        password: hashedPassword,
      });
      res.status(201).send("created");
    } else {
      res.send({ message: "something is wrong" }).status(404);
    }
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  try {
    const {
      body: { email, password },
    } = req;
    console.log(password);
    const contact = await contactsDB.getContacts({ email });
    if (!contact) {
      res.status(404).send(`contact with such email: ${email} doesn't exist`);
    }
    const comparedPassword = await bcrypt.compare(password, contact.password);
    if (!comparedPassword) {
      res.status(404).send("wrong password");
    }
    let access_token = await createVerifyToken({ id: contact._id });

    console.log(access_token);
    res.json({
      access_token: access_token,
      email: contact.email,
      //   phone: contact.phone,
      //   favorite: contact.favorite,
      //   id: contact._id,
    });
  } catch (e) {
    next(e);
  }
};
module.exports = {
  registrationController,
  loginController,
};
