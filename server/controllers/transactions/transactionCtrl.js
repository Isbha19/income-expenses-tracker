const Account = require("../../model/Account");
const Transaction = require("../../model/Transaction");
const User = require("../../model/User");
const { AppErr } = require("../../utils/appErr");

//create
const createTransactionCtrl = async (req, res, next) => {
  const { name, transactionType, createdBy, account, notes, amount, category } =
    req.body;
  try {
    //find user
    const userFound = await User.findById(req.user);
    if (!userFound) {
      return next(new AppErr("User not found", 404));
    }
    //find account
    const accountFound = await Account.findById(account);
    if (!accountFound) {
      return next(new AppErr("Account not found", 404));
    }
    //create transaction
    const transaction = await Transaction.create({
      name,
      amount,
      transactionType,
      account,
      createdBy: req.user,
      notes,
      category,
    });
    //push the transaction to the account
    accountFound.transactions.push(transaction._id);
    //resave the account
    accountFound.save();
    res.json({ data: transaction });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//all
const getTransactionsCtrl = async (req, res, next) => {
  try {
    const trans = await Transaction.find();
    res.status(200).json({ status: "success", data: trans });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//single
const getTransactionCtrl = async (req, res) => {
  try {
    const { id } = req.params;
    const trans = await Transaction.findById(id);
    res.status(200).json({ status: "success", data: trans });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//delete
const deleteTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);

    res.json({ status: "success", data: null });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//update
const updateTransactionCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tran = await Transaction.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.json({ status: "success", data: tran });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

module.exports = {
  createTransactionCtrl,
  getTransactionsCtrl,

  getTransactionCtrl,
  deleteTransactionCtrl,
  updateTransactionCtrl,
};
