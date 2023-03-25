const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");

const express = require("express");
const app = express();

const contactsRouter = require("./router/ContactsRouter");

app.use(express.json());

app.use("/", contactsRouter);
app.listen(3000, () => {
  console.log("Server works on port 3000");
});
