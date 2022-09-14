const express = require("express");
const { userExists } = require("../middlewares/user.middlewares");
const {createUsersValidation} = require('../models/validations');

const {
  createUser,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/user.controllers");

const userRoutes = express.Router();

userRoutes.post("/",createUsersValidation, createUser);
userRoutes.get("/", getUsers);
userRoutes.patch("/:id", userExists, updateUser);
userRoutes.delete("/:id", userExists, deleteUser);

module.exports = {
  userRoutes,
};
