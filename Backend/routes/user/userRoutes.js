const express = require("express");
const userRouter = express.Router();
const { isAuth } = require("../../util");

// import all controllers
const controller = require("../../controllers/userController");

// POST method;
userRouter.post("/register", controller.register); // register user
userRouter.post("/login", controller.login); //login in app
userRouter.post("/verify", controller.verifyUser, (_req, res) =>
  res.end()
); // authenticate user

//PUT methods
userRouter.patch(
  "/updateUserPassword",
  isAuth,
  controller.updateUserPassword
); //use to update the user password

module.exports = userRouter;
