const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const express = require("express");
const authRouter = require("./auth/auth.router");
const runServer = async () => {
  await mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true });
  console.log("DataBase has been connected");
  const app = express();

  const contactsRouter = require("./router/ContactsRouter");

  app.use(express.json());

  app.use("/", contactsRouter);
  app.use("/auth", authRouter);
  app.listen(3000, () => {
    console.log("Server works on port 3000");
  });
};

runServer();
