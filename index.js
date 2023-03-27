const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const runServer = async () => {
  await mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true });
  console.log("DataBase has been connected");
  const app = express();

  const contactsRouter = require("./router/ContactsRouter");

  app.use(express.json());

  app.use("/", contactsRouter);
  app.listen(3000, () => {
    console.log("Server works on port 3000");
  });
};

runServer();
