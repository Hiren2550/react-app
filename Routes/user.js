const express = require("express");
const Router=express.Router();
const userController = require("../controller/user");

Router
  .post("/", userController.createUser)
  .get("/", userController.getAllUsers)
  .get("/:id", userController.getUser)
  .put("/:id", userController.replaceUser)
  .patch("/:id", userController.updateUser)
  .delete("/:id", userController.deleteUser)

exports.Router=Router