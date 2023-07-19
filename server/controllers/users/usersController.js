const bcrypt = require("bcryptjs");
const User = require("../../model/User");
const { AppErr, appErr } = require("../../utils/appErr");
const generateToken = require("../../utils/generateToken");

// Register user
const registerUserCtrl = async (req, res, next) => {
  const { fullname, password, email } = req.body;
  try {
    // Check if fields are empty
    if (!email || !password || !fullname) {
      return next(new Error("Please provide all fields"));
    }

    // Check if email exists
    const userFound = await User.findOne({ email });
    if (userFound) {
      return next(appErr("User already exists", 400));
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      fullname,
      email,
      password: hashedPassword,
    });

    res.json({
      status: "success",
      fullname: user.fullname,
      id: user._id,
      email: user.email,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//login
const userLoginCtrl = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    //if the email exist
    const userFound = await User.findOne({ email });
    if (!userFound) {
      return next(new AppErr("Invalid login credentials"));
    }

    //check for password validity
    const isPasswordMatch = await bcrypt.compare(password, userFound.password);
    if (!isPasswordMatch) {
      return next(new AppErr("Invalid login credentials"));
    }
    res.json({
      status: "success",
      fullname: userFound.fullname,
      id: userFound._id,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//profile

const userprofileCtrl = async (req, res) => {
  console.log(req.user);
  try {
    const user = await User.findById(req.user).populate({
      path: "accounts",
      populate: {
        path: "transactions",
        model: "Transaction",
      },
    });
    res.json(user);
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//delete

const deleteUserCtrl = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.user);
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(new AppErr(error.message, 500));
  }
};

//update
const updateUserCtrl = async (req, res, next) => {
  try {
    //check if email exist
    if (req.body.email) {
      const userFound = await User.findOne({ email: req.body.email });
      if (userFound) {
        return next(
          new AppErr("Email is taken or you already have this email", 400)
        );
      }
    }

    //check if user is updating the password
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //update the user
      const user = await User.findByIdAndUpdate(
        req.user,
        {
          password: hashedPassword,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      //send the response
      return res.status(200).json({
        status: "success",
        data: user,
      });
    }
    //updating other properties
    const user = await User.findByIdAndUpdate(req.user, req.body, {
      new: true,
      runValidators: true,
    });
    //send the response
    return res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    res.json(error);
  }
};
module.exports = {
  registerUserCtrl,
  userLoginCtrl,
  userprofileCtrl,
  deleteUserCtrl,
  updateUserCtrl,
};
