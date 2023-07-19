const express = require("express");
const {
  createAccountCtrl,
  deleteAccountCtrl,
  getAccountCtrl,
  updateAccountCtrl,
  getAccountsCtrl,
} = require("../../controllers/accounts/accountsCtrl");
const isLogin = require("../../middlewares/isLogin");

const accountsRoute = express.Router();

//POST/api/v1/accounts
accountsRoute.post("/", isLogin, createAccountCtrl);

//GET/api/v1/accounts/:id
accountsRoute.get("/:id", getAccountCtrl);

//DELETE/api/v1/accounts/:id
accountsRoute.delete("/:id", deleteAccountCtrl);

//PUT/api/v1/accounts/:id
accountsRoute.put("/:id", updateAccountCtrl);

//GET/api/v1/accounts
accountsRoute.get("/", getAccountsCtrl);
module.exports = accountsRoute;
