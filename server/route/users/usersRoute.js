const express = require("express");
const {
  registerUserCtrl,
  userLoginCtrl,
  userprofileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
} = require("../../controllers/users/usersController");
const isLogin = require("../../middlewares/isLogin");

const usersRoute = express.Router();

//POST/api/v1/users/register
usersRoute.post("/register", registerUserCtrl);

//POST/api/v1/users/login
usersRoute.post("/login", userLoginCtrl);

//GET/api/v1/users/profile/:id

usersRoute.get("/profile/", isLogin, userprofileCtrl);

//DELETE/api/v1/users/
usersRoute.delete("/", isLogin, deleteUserCtrl);

//PUT/api/v1/users/
usersRoute.put("/", isLogin, updateUserCtrl);

module.exports = usersRoute;
