const express = require("express");
const {
  registrationController,
  loginController,
} = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/registration", registrationController);
authRouter.post("/login", loginController);
module.exports = authRouter;
